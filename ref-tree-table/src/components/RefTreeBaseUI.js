import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { is } from 'immutable';
import Loading from 'rc-loading';
import RefCoreError from 'ref-core/lib/refs/refcoreerror';
import RefCoreTree from 'ref-core/lib/refs/refcoretree';
import RefCoreSearch from 'ref-core/lib/refs/refcoresearch';
import 'ref-core/lib/refs/refcoreerror.css';
import 'ref-core/lib/refs/refcoretree.css';
import 'ref-core/lib/refs/refcoresearch.css';
import './RefTreeBase.less';
const noop = () => {
};
const propTypes = {
  title: PropTypes.string,
  multiple: PropTypes.bool, //  默认单选
  showLine: PropTypes.bool,
  defaultExpandAll: PropTypes.bool,  // 数默认展开
  checkStrictly: PropTypes.bool,
  checkedArray: PropTypes.array, //  指定已选择数据id
  lazyModal: PropTypes.bool,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  lang: PropTypes.string,
  //重命名属性
  searchable: PropTypes.bool, //  是否应用搜索 默认 false,
  onTreeChange: PropTypes.func,//树操作的时候节点选中返回
  onTreeSearch:PropTypes.func, //搜索
};
const defaultProps = {
  title: '弹窗标题',
  searchable: false, //  是否应用搜索 默认 false,
  multiple: false, //  默认单选
  showLine: false, //  默认单选
  defaultExpandAll: true,  // 数默认展开
  checkStrictly: false,
  checkedArray: [], //  指定已选择数据id
  lazyModal: false,
  onCancel: noop,
  onSave: noop,
  lang: 'zh_CN',
  onTreeChange: ()=>{},
  onTreeSearch: () =>{},
}

class RefTreeBaseUI extends Component {
  constructor(props) {
    super(props);
    const { checkedArray, multiple, checkStrictly, 
      defaultExpandAll, valueField } = props;
    this.state = {
      selectedArray: checkedArray || [], //  记录保存的选择项
      defaultExpandAll,
      multiple,
      checkStrictly,
      checkedKeys: checkedArray.map(item => {
        return item[valueField];
      }),
      onSaveCheckItems: [],
    };
    this.treeData = props.treeData || [];
    this.treeDataCache = {};
  }

  // shouldComponentUpdate(nextProps, nextState){
	// 	return !is(nextState, this.state) || nextProps.showModal !== this.props.showModal;
	// }
	// componentWillReceiveProps(nextProps) {
	// 	let _this = this;
	// 	//严格模式下每次打开必须重置数据
	// 			//开启严格模式 
	// 	this.setState({
	// 		showLoading: true
	// 	},() => {
	// 		this.initComponent();
	// 	});
	// 	// this.setState({
	// 	//   checkedArray:this.props.option.checkedArray
	// 	// })
	// }

  onSearchClick = (value) => {
    this.props.onTreeSearch(value);
  };

  onSearchChange = (value) => {
    this.props.onTreeSearch(value);
  };

  onSelectNode = (checkedArray) => {
    let { onTreeChange } = this.props;
    onTreeChange(checkedArray)
  }
  
  onCheck(selectedKeys, event) {
    const { multiple } = this.props;
    if (!multiple) {
      //单选
      this.setState({
        selectedArray: [event.node.props.attr],
        checkedKeys: [event.node.props.eventKey],
        onSaveCheckItems: [event.node.props.attr]
      }, () => {
        this.onSelectNode([event.node.props.attr]);
      });
    } else {
      this.setState({
        selectedArray: event.checkedNodes.map(item => {
          return item.props.attr;
        }),
        checkedKeys: selectedKeys,
        onSaveCheckItems: event.checkedNodes.map(item => {
          return item.props.attr;
        })
      }, () => {
        this.onSelectNode([event.node.props.attr]);
      });
    }
  }

  onDoubleClick(selectedKeys, event) {
    let item = event.node.props;
    let arr = [{ ...item.attr, refpk: item.eventKey, id: item.eventKey }]
    this.setState({
      selectedArray: arr,
      checkedKeys: [item.eventKey]
    }, () => {
      this.onSelectNode(arr)
    });
  }

  onSelect(selectedKeys, event) {
    const { checkAllChildren, multiple } = this.props;
    const eventKey = event.node.props.eventKey
    let { onSaveCheckItems } = this.state
    let ishaskey = false
    let keyIndex;
    // if (multiple) return;
    onSaveCheckItems.forEach((v, i) => {
      if (v.id == eventKey) {
        keyIndex = i
      }
      if (v.id == eventKey && v.checkAllchildren) {
        ishaskey = true
        return false
      }
    })
    if (ishaskey) {
      this.setState({
        checkedKeys: selectedKeys,
      });
      this.onSelectNode(this.state.selectedArray)
      return false
    }
    if (!checkAllChildren) {
      const arr = event.selectedNodes.map((item) => {
        return { ...item.props.attr, refpk: item.key, id: item.key }
      })
      this.setState({
        selectedArray: arr,
        checkedKeys: selectedKeys,
      });
      this.onSelectNode(arr);
    } else {
      let arr = {}
      event.selectedNodes.forEach((item) => {
        if (item.key == eventKey) {
          arr = { ...item.props.attr, refname: item.props.title, refpk: item.key, id: item.key }
        }
      })
      if (selectedKeys.indexOf(eventKey) > -1) {
        onSaveCheckItems.push(arr)
      } else {

        onSaveCheckItems.splice(keyIndex, 1)
      }

      this.setState({
        selectedArray: onSaveCheckItems,
        checkedKeys: selectedKeys,
        onSaveCheckItems: onSaveCheckItems
      });
      this.onSelectNode(onSaveCheckItems);
    }
  }

  render() {
    let {
      className,
      searchable,
      valueField,
      showLine,
      lazyModal,
      showLoading,
      lang,
      defaultExpandAll,
      nodeDisplay = "{refname}",
      nodeKeysFunc
    } = this.props;
    const { checkedKeys,  checkStrictly} = this.state;
    return (
      
      <div
        className={`${className} ref-core ref-tree-table-base `}
      >
       	<Loading spinning={showLoading} type={'fence'} displayType={"block"} >
        <RefCoreSearch
            show={searchable}
            onSearch={this.onSearchClick}
            onChange={this.onSearchChange}
            language={lang}
          />
          {
            this.treeData.length ?
              <RefCoreTree
                show={Boolean(this.treeData.length)}
                nodeKeys={(item) => item[valueField]}
                displayField={nodeDisplay}
                data={this.treeData}
                defaultExpandAll={lazyModal ? false : defaultExpandAll}
                checkable={false}
                multiple={false}
                onCheck={this.onCheck.bind(this)}
                onSelect={this.onSelect.bind(this)}
                onDoubleClick={this.onDoubleClick.bind(this)}
                checkedKeys={checkedKeys}
                selectedKeys={checkedKeys}
                checkStrictly={checkStrictly}
                showLine={showLine}
                loadData={lazyModal ? this.onLoadData.bind(this) : () => { }}
              /> :
              <RefCoreError show={!Boolean(this.treeData.length)} language={lang} />
          }
        </Loading>
      </div>
    );
  }
}
RefTreeBaseUI.propTypes = propTypes;
RefTreeBaseUI.defaultProps = defaultProps;
export default RefTreeBaseUI;