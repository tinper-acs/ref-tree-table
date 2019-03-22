
import React, { Component } from 'react';
import Loading from 'rc-loading';
import RefCoreError from 'ref-core/lib/refs/refcoreerror';
import RefCoreTab from 'ref-core/lib/refs/refcoretab';
import RefCoreSearch from 'ref-core/lib/refs/refcoresearch';
import 'ref-core/lib/refs/refcoreerror.css';
import 'ref-core/lib/refs/refcoretab.css';
import 'ref-core/lib/refs/refcoresearch.css';
import {paginationLocale} from 'ref-core/lib/utils/locale.js'
import {Pagination,Table,Checkbox} from 'tinper-bee';
import multiSelect from 'tinper-bee/lib/multiSelect.js';
import './RefMultipleTableBase.less'
// const MultiSelectTable = multiSelect(Table, Checkbox);
class RefMultipleTableBase extends Component {
	columnsData = []//表头数据
	tableData = []//表格数据
	pageCount = 1//总页数
	pageSize = '10'//每页数据数
	currPageIndex = 1//激活页码
	filterInfo = ''
	constructor(props) {
		super(props);
		this.state = {
			tableIsSelecting: true,
			selectedDataLength: 0,
		};
		this.filterInfo = ''
        this.checkedArray = [];
        this.checkedMap = {};
		this.TableView = props.multiple ? multiSelect(Table, Checkbox) : Table;
	}
	componentDidMount(){
		this.initComponent(this.props);
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.showModal && nextProps.condition !== this.props.condition){
			this.initComponent(nextProps);
		}
		
	}
	initComponent = (props) => {
        //内部缓存已选择值，不通过 state 缓存，表格缓存状态自动实现
		let { checkedArray,columnsData,tableData,page,valueField} = props;
		console.log('tableUIde checkedArray',checkedArray,tableData)
		
		this.checkedArray = Object.assign([],  checkedArray || []);
		//内部缓存已选择值，缓存成 Map 便于检索
		this.checkedMap = {};
		this.checkedArray.forEach(item=>{
			this.checkedMap[item[valueField]] = item;
        });
        this.columnsData = columnsData
        this.tableData = tableData;
        this.pageCount = page.pageCount || 0;
        this.currPageIndex = page.currPageIndex + 1 || 0;
        this.totalElements = page.totalElements || 0;
        this.setState({
            mustRender: Math.random()
        });
	}
	onChange = (checkedArray) => {
		let { onChange } = this.props;
		onChange(checkedArray)
	}


	/**
	 * 跳转到制定页数的操作
	 * @param {number} index 跳转页数
	 */
	handlePagination = (index) => {
		let { filterInfo } = this;

		let param  = {
			'refClientPageInfo.currPageIndex': index - 1, 
			'refClientPageInfo.pageSize': this.pageSize,
			content: filterInfo
		}
		this.props.loadTableData(param);
		
	}
	/**
	 * 选择每页数据个数
	 * 
	 * 没有启用
	 */
	dataNumSelect = (index, pageSize) => {
		let { filterInfo } = this;
		Object.keys(filterInfo).forEach(key => {
			if(!filterInfo[key]){
				delete filterInfo[key];
			}
		});

		let param  = {
			condition: this.props.condition,
			'refClientPageInfo.currPageIndex': index , 
			'refClientPageInfo.pageSize': pageSize
		}
		if(Object.keys(filterInfo) > 0){
			param.content = JSON.stringify(filterInfo);
		}
		this.pageSize = pageSize;
		this.props.loadTableData(param);
	}

	miniSearchFunc = (value) => {
		this.props.onTableSearch(value)
	}
	/**
	 * 多选状态下表格只能通过选择 checkbox 来选值，同时触发改方法
	 * @function
	 * @param checkedArray  已勾选值，表格中自动去除未勾选值
	 * @param recode  当前操作的行数据
	 */
	getSelectedDataFunc = (checkedArray, recode) => {
		if(!this.props.multiple) return;
		const _this = this;
		let { valueField = "refpk" } = this.props;
		if(recode){
			//单条操作
			if( recode._checked && !_this.checkedMap[recode[valueField]] ){
				_this.checkedArray.push(recode);
				_this.checkedMap[recode[valueField]] = recode;
	
			}else if( !recode._checked && this.checkedMap[recode[valueField]] ){
	
				delete _this.checkedMap[recode[valueField]];
				_this.checkedArray = [];
				Object.keys(_this.checkedMap).forEach(item => {
					_this.checkedArray.push(this.checkedMap[item])
				});
	
			}
		}else{
			//多条操作
			_this.checkedArray = [];
			let { tableIsSelecting } = this.state;
			if(tableIsSelecting){
				//选择中...
				if(checkedArray.length > 0){
					//全选操作 
					//去重操作
					//直接操作当前页数据
					_this.tableData.forEach(item => {
						if(!_this.checkedMap.hasOwnProperty(item[valueField])){
							_this.checkedMap[item[valueField]] = item;
						}
					})
				}else{
					//全取消操作
					//去重操作
					//直接操作当前页数据
					_this.tableData.forEach(item => {
						if(_this.checkedMap.hasOwnProperty(item[valueField])){
							delete _this.checkedMap[item[valueField]];
						}
					})
				}
				//组装已选数据
				_this.checkedArray = Object.keys(_this.checkedMap).map(item =>{
					return _this.checkedMap[item];
				});
			}else{
				//查看已选择
				if(checkedArray.length <= 0){
					//查看时只有取消选择操作，全选操作不会出现这里可考虑取消这个判断
					_this.checkedMap = {};
					_this.checkedArray = [];
				}

			}
		}
		_this.setState({
			selectedDataLength: checkedArray.length,
			mustRender: Math.random()
		});
		this.onChange(this.checkedArray);
	}
	/**
	 * 双击行选择该行数据，只在单选状态生效
	 * @record {object} 该行数据
	 */
	onRowDoubleClick = (record) => {
		if(this.props.multiple) return;
		let { valueField = "refpk" } = this.props;
		record._checked = true;
		this.checkedArray = [record];
		this.checkedMap = {};
		this.checkedMap[record[valueField]] = record;
		this.setState({
			checkedArray: this.checkedArray,
		})
		this.onChange(this.checkedArray);
	}
	/**
	 * 单击行选择该行数据，只在单选状态生效
	 * @record {object} 该行数据
	 */
	onRowClick = (record) => {
		if(this.props.multiple) return;
		const _this = this;
		let { valueField = "refpk" } = _this.props;

		//点击同一行数据时取消选择
		if(_this.checkedMap.hasOwnProperty(record[valueField])){
			_this.checkedArray = [];
			_this.checkedMap = {};
			_this.setState({
				mustRender: Math.random()
			});
		}else{
			let checkedRecord = Object.assign({_checked: true}, record)
			_this.checkedArray = [checkedRecord];
			_this.checkedMap = {};
			_this.checkedMap[checkedRecord[valueField]] = checkedRecord;
			_this.setState({
				mustRender: Math.random()
			});
		}
		this.onChange(this.checkedArray);
	}
	/**
	 * 为选中行增加背景色，只在单选状态生效
	 * @record {object} 该行数据
	 */
	renderRowClassName = (recode) => {
		if(this.props.multiple) return;
		return recode._checked ? 'ref-multiple-table-row-selected' : '';
	}
	/**
	 * 为数据增加 key
	 * @record {object} 该行数据
	 */
	putRowKey = (record, i) => {
		const _this = this;
		return record.key
	};
	onSelectTabItem = (a, state) => {
		if(state === 'selecting'){
			this.pageCount = Math.ceil(this.totalElements / this.pageSize);
			this.setState({
				tableIsSelecting: true
			});
		}else{
			this.pageCount = 1;
			this.setState({
				tableIsSelecting: false
			});
		}
	}

	
	render() {
        const _this = this;
        let { tableIsSelecting, selectedDataLength } = this.state;
        let { className,  lang = 'zh_CN', valueField ,showLoading
        } = this.props;
        let { tableData, pageCount, currPageIndex, 
            columnsData, totalElements, checkedArray } = _this;
        let _tableData = tableData.map(item => {
			item._checked = _this.checkedMap.hasOwnProperty(item[valueField])
			return item;
		});
		checkedArray.forEach(item => {
			item._checked = true;
		});
		return (
			<div className={`${className} ref-core ref-tree-table-base`}>
				<Loading spinning={showLoading} type={'fence'} displayType={"block"} >
					<RefCoreTab
						className="ref-tree-table-base-tab"
						selectedData={_this.checkedArray}
						onSelectTabItem={_this.onSelectTabItem}
						selectedDataLength={selectedDataLength}
						selecteing={tableIsSelecting}
						language={lang}
					>
							{/*简单查询 */}
								<RefCoreSearch
									onSearch={_this.miniSearchFunc}
									onChange={_this.miniSearchFunc}
									language={lang}
								/>
						</RefCoreTab>
					{
						columnsData && columnsData.length ? React.createElement(_this.TableView,{
							bordered: true,
							rowKey: this.putRowKey,
							columns: columnsData,
							getSelectedDataFunc: this.getSelectedDataFunc,
							rowClassName: this.renderRowClassName,
							data:  tableIsSelecting ? _tableData : _this.checkedArray,
							onRowDoubleClick: this.onRowDoubleClick,
							onRowClick: this.onRowClick,
							scroll:{ x: false, y: true }
						}) :
						<RefCoreError show={!Boolean(tableData.length)} language={lang} />
					} 
					
					<div className="ref-tree-table-base-pagination">
						<Pagination
							first
							last
							prev
							next
							showJump={false}
							boundaryLinks
							className={Boolean(columnsData.length) && tableIsSelecting ? '' : `ref-tree-table-base-pagination-hide`}
							items={pageCount}
							maxButtons={3}
							total={totalElements}
							activePage={currPageIndex}
							onDataNumSelect={this.dataNumSelect}
							onSelect={this.handlePagination}
							locale={paginationLocale(lang)}
						/>
					</div>
				</Loading>
			</div>
		);
	}
}
export default RefMultipleTableBase;