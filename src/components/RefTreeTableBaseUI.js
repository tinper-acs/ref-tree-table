import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Spin } from '@tinper/next-ui'
import RefCoreButton from 'ref-core/lib/refs/RefCoreButton.js';
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
	destory: PropTypes.func,
	matchData:PropTypes.array,
	isLocalSearch: PropTypes.bool, //  默搜索是否是本地
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
	matchData:[],
	destory: () => { },
	isLocalSearch:false,
};

function  noop() {
	
}
class RefTreeTableBaseUI extends Component {
	constructor(props) {
		super(props);
		this.checkedTreeArray = props.checkedTreeArray || [];
	}
	componentWillReceiveProps(nextProps){
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
	onTreeChangeFromBaseUI = (checkedTreeArray) =>{
		let { onTreeChange } = this.props;
		this.checkedTreeArray = checkedTreeArray;
		onTreeChange(checkedTreeArray);
	}

	render() {
		const _this = this;
		const { className,showModal, searchable, backdrop, title, chosenText, hiddenChosenText, showLine, 
			multiple, menuTitle, tableTitle, valueField,value,
			lang,buttons,checkStrictly=true,defaultExpandAll,nodeDisplay,
		    lazyModal,onLoadData,onSave, fieldid} = this.props;
		let {showLoading , treeData,onTreeChange,onTreeSearch,matchData} = this.props;
		let {
			columnsData,
			tableData,
			page,
			loadTableData,
			onTableSearch,
			condition,
			theme="ref-red",
			modalProps={},
			tableProps={},
			mustPaginationShow=false,
			treeNodeDisabledKey,
			treeNodeDisabledFunc = noop,
			isLocalSearch,
			footerBtnDom='',
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
			onTreeChangeFromBaseUI:this.onTreeChangeFromBaseUI,
			onTreeSearch,
			lazyModal,
			onLoadData,
			isLocalSearch,
			checkedTreeArray:this.checkedTreeArray,
			treeNodeDisabledKey,
			treeNodeDisabledFunc,
		});
		let tablePropsAll = Object.assign({},{
			className,
			lang,
      chosenText,
      hiddenChosenText,
			valueField,
			showLoading,
			multiple,
			showModal,//就是为了update，不对外
			condition,
			columnsData,
			tableData,
			page,
			loadTableData,
			onTableSearch,
			matchData,
			value,
			tableProps,
			mustPaginationShow,
			onSave
		})
		return (
			<Modal
				show={showModal} className={`${theme}  ${className} ref-core ref-core-modal ref-tree-table`}
				backdrop={backdrop}
				size={'xlg'}
				onHide={this.handleBtnCancel}
				autoFocus={false}
				{...modalProps}
				fieldid={fieldid ? fieldid + '_modal' : undefined}
			>
				<Modal.Header closeButton={true} fieldid={fieldid ? fieldid + '_modal_header' : undefined}>
						<Modal.Title fieldid={fieldid ? fieldid + '_modal_title' : undefined}>{title}</Modal.Title>
				</Modal.Header >
				<Modal.Body ref={ref=>this.modalRef=ref} fieldid={fieldid ? fieldid + '_modal_body' : undefined}>
					    <Spin getPopupContainer={this.modalRef} spinning={showLoading} />
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
									fieldid={fieldid ? fieldid : undefined}
								/>
							</div>
							<div className="ref-tree-table-layout-col">
								{
									tableTitle && <div className="ref-tree-table-layout-col-title">
										{tableTitle || ''}
									</div>
								}
								
								<RefMultipleTableBaseUI
									{...tablePropsAll}
									fieldid={fieldid ? fieldid : undefined}
									onChange={_this.onSelectChange}
								/> 
							</div>
						</div>
				</Modal.Body>
				<Modal.Footer className={'ref-core-modal-footer '} fieldid={fieldid ? fieldid + '_modal_footer' : undefined}>
					<RefCoreButton 
						language={lang} 
						onClickBtn={_this.onClickBtn}
						buttons={buttons} 
						emptyBut={false}
						footerBtnDom={footerBtnDom}
						fieldid={fieldid ? fieldid : undefined}
					/>
				</Modal.Footer>
			</Modal>
		);
	}
}

RefTreeTableBaseUI.propTypes = propTypes;
RefTreeTableBaseUI.defaultProps = defaultProps;
export default RefTreeTableBaseUI;