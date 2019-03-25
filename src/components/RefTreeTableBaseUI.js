import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'tinper-bee';
import Loading from 'rc-loading';
import RefCoreButton from 'ref-core/lib/refs/refcorebutton.js';
import 'ref-core/lib/refs/refcorebutton.css';
// import RefMultipleTableBase from './RefMultipleTableBase';
// import RefTreeBase from './RefTreeBase';
import RefMultipleTableBaseUI from './RefMultipleTableBaseUI';
import RefTreeBaseUI from './RefTreeBaseUI';

const propTypes = {
	title: PropTypes.string,
	searchable: PropTypes.bool,
	// emptyBut: PropTypes.bool,
	param: PropTypes.object,
	checkedArray: PropTypes.array,
	onCancel: PropTypes.func,
	onSave: PropTypes.func,
	lang: PropTypes.string,
	menuTitle: PropTypes.string,
	tableTitle: PropTypes.string,
	valueField: PropTypes.string,
	className: PropTypes.string,
	backdrop: PropTypes.bool,
	showLine: PropTypes.bool,
	multiple: PropTypes.bool,
	destory: PropTypes.func
};
const defaultProps = {
	title: '弹窗标题',
	searchable: true,
	// emptyBut: false,
	param: {//url请求参数
	},
	checkedArray: [],
	onCancel: function (p) {
	},
	onSave: function (sels) {
	},
	lang: 'zh_CN',
	menuTitle: '',
	tableTitle: '',
	valueField: 'refpk',
	classNam: '',
	backdrop: true,
	showLine: false,
	multiple: false,

	destory: () => { }
};


class RefTreeTableBaseUI extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//  condition: '',
			// showLoading: true
		};
		this.checkedArray = props.checkedArray || [];
	}
	
	//table的所有点击
	onSelectChange = (record) => {
		this.checkedArray = record;
	}
	
	onClickBtn = (type) => {
		const { onCancel, onSave } = this.props;
		switch (type) {
			case 'save':
				onSave(this.checkedArray);
				break;
			case 'cancel':
					onCancel();
				break;
			case 'clear':
				this.checkedArray = [];
				this.setState({
					reander: Math.random()
				})
				break;
			default:
		}
		
	};
	handleBtnCancel = () => {
		this.props.onCancel()
	}
	render() {
		const _this = this;
		const { className,showModal, searchable, backdrop, title, showLine, 
			multiple, menuTitle, tableTitle, valueField,
			lang,buttons,checkStrictly,defaultExpandAll} = this.props;
		let {showLoading , treeData,onTreeChange,onTreeSearch,} = this.props;
		let {
			columnsData,
			tableData,
			page,
			loadTableData,
			onTableSearch,
			condition,
		} = this.props;
		let treeProps = Object.assign({},{
			className,
			searchable,
			showLine,
			multiple,
			lang,
			checkStrictly,
			valueField,
			showLoading,
			nodeDisplay,
			defaultExpandAll,
			treeData,
			onTreeChange,
			onTreeSearch,
		});
		let tableProps = Object.assign({},{
			className,
			lang,
			valueField,
			showLoading,
			multiple,
			showModal,//就是为了update，不对外
			checkedArray:this.checkedArray,
			condition,
			columnsData,
			tableData,
			page,
			loadTableData,
			onTableSearch,
		})
		return (
			<Modal
				show={showModal} className={`${className} ref-core ref-core-modal ref-tree-table`}
				backdrop={backdrop}
				size={'lg'}
				onHide={this.handleBtnCancel}
			>
				<Modal.Header closeButton={true}>
						<Modal.Title>{title}</Modal.Title>
				</Modal.Header >
				<Modal.Body>
					<Loading spinning={showLoading} type={'fence'} displayType={"block"} >
						<div className="ref-tree-table-layout">
							<div className="ref-tree-table-layout-col">
								{
									menuTitle && <div className="ref-tree-table-layout-col-title">
										{menuTitle}
									</div>
								}
								<RefTreeBaseUI
									onTreeChange={onTreeChange}
									{...treeProps}
									// onTreeLoading = {_this.onTreeLoading}
								/>
							</div>
							<div className="ref-tree-table-layout-col">
								{
									tableTitle && <div className="ref-tree-table-layout-col-title">
										{tableTitle || ''}
									</div>
								}
								
								<RefMultipleTableBaseUI
									{...tableProps}
									checkedArray={_this.checkedArray}
									onChange={_this.onSelectChange}
								/> 
							</div>
						</div>
					</Loading>
				</Modal.Body>
				<Modal.Footer className={'ref-core-modal-footer '}>
					<RefCoreButton 
						language={lang} 
						onClickBtn={_this.onClickBtn}
						buttons={buttons} 
						emptyBut={false}
					/>
				</Modal.Footer>
			</Modal>
		);
	}
}

RefTreeTableBaseUI.propTypes = propTypes;
RefTreeTableBaseUI.defaultProps = defaultProps;
export default RefTreeTableBaseUI;