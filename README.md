# ref-tree-table树表参照


## 何时使用

具有单选多选的树表形参照



## 如何使用

```sh

$ npm install pap-refer --save
 --save

引入

import RefTreeTableWithInput,{RefTreeTable, createRefTreeTable,createRefTreeTableModal} from 'pap-refer';

样式

import 'pap-refer/dist/index.css"

或者
import RefTreeTableWithInput,{RefTreeTable, createRefTreeTable,createRefTreeTableModal} from 'pap-refer/lib/ref-tree-table.js';
import 'pap-refer/lib/ref-tree-table.css"

```

## 代码演示

```javascirpt
/**
 *
 * @title ref-tree-table树表参照
 * @description 具有单选多选的树表形参照
 *
 */

import React, { Component } from 'react';
import {RefTreeTableWithInput} from '../../src/index';
import {Form,Button} from 'tinper-bee';

class Demo1 extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            condition:'',
            num:0,
        }

    }
    componentDidMount(){
        this.columnsData = [{"key":"code","dataIndex":"code","title":"组织编码"},{"key":"name","dataIndex":"name","title":"组织名称"}];
        this.tableData = [{"rownum_":1,"code":"001","name":"人员1","mobile":"15011430230","refcode":"001","refpk":"cc791b77-bd18-49ab-b3ec-ee83cd40012a","id":"cc791b77-bd18-49ab-b3ec-ee83cd40012a","refname":"人员1","email":"11@11.com","key":"cc791b77-bd18-49ab-b3ec-ee83cd40012a"},{"rownum_":2,"code":"002","name":"人员2","mobile":"15011323234","refcode":"002","refpk":"de2d4d09-51ec-4108-8def-d6a6c5393c3b","id":"de2d4d09-51ec-4108-8def-d6a6c5393c3b","refname":"人员2","email":"22@11.com","key":"de2d4d09-51ec-4108-8def-d6a6c5393c3b"},{"rownum_":3,"code":"003","name":"人员3","mobile":"15011430232","refcode":"003","refpk":"004989bb-a705-45ce-88f3-662f87ee6e52","id":"004989bb-a705-45ce-88f3-662f87ee6e52","refname":"人员3","email":"33@33.com","key":"004989bb-a705-45ce-88f3-662f87ee6e52"},{"rownum_":4,"code":"004","name":"人员4","mobile":"15011430234","refcode":"004","refpk":"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd","id":"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd","refname":"人员4","email":"33@34.com","key":"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd"},{"rownum_":5,"code":"005","name":"人员5","mobile":"15011430235","refcode":"005","refpk":"5e3a85ec-5e14-4734-8b3a-1e6168426c89","id":"5e3a85ec-5e14-4734-8b3a-1e6168426c89","refname":"人员5","email":"55@26.com","key":"5e3a85ec-5e14-4734-8b3a-1e6168426c89"},{"rownum_":6,"code":"006","name":"人员6","mobile":"15011323232","refcode":"006","refpk":"112621b9-b7ae-41b9-9428-61779334c5d6","id":"112621b9-b7ae-41b9-9428-61779334c5d6","refname":"人员6","email":"66@516.com","key":"112621b9-b7ae-41b9-9428-61779334c5d6"},{"rownum_":7,"code":"007","name":"人员7","mobile":"15011234567","refcode":"007","refpk":"394bba90-ed0f-4794-a44e-fd9ce6e9257d","id":"394bba90-ed0f-4794-a44e-fd9ce6e9257d","refname":"人员7","email":"55@4.com","key":"394bba90-ed0f-4794-a44e-fd9ce6e9257d"},{"rownum_":8,"code":"008","name":"人员8","mobile":"15011327890","refcode":"008","refpk":"a9f4c869-ca0b-4d12-847e-00eca08bfef6","id":"a9f4c869-ca0b-4d12-847e-00eca08bfef6","refname":"人员8","email":"55@556.com","key":"a9f4c869-ca0b-4d12-847e-00eca08bfef6"},{"rownum_":9,"code":"bpm01","name":"张一","mobile":"18777777777","refcode":"bpm01","refpk":"0dc47840-873a-4ed3-8ae7-c2335a76b385","id":"0dc47840-873a-4ed3-8ae7-c2335a76b385","refname":"张一","email":"bpm01@qq.com","key":"0dc47840-873a-4ed3-8ae7-c2335a76b385"},{"rownum_":10,"code":"bpm02","name":"张二","mobile":"18788888888","refcode":"bpm02","refpk":"c97b59e2-9fa3-44d7-93b0-1be52f7aa550","id":"c97b59e2-9fa3-44d7-93b0-1be52f7aa550","refname":"张二","email":"bpm02@qq.com","key":"c97b59e2-9fa3-44d7-93b0-1be52f7aa550"}];
        this.originTableData = [{"rownum_":1,"code":"001","name":"人员1","mobile":"15011430230","refcode":"001","refpk":"cc791b77-bd18-49ab-b3ec-ee83cd40012a","id":"cc791b77-bd18-49ab-b3ec-ee83cd40012a","refname":"人员1","email":"11@11.com","key":"cc791b77-bd18-49ab-b3ec-ee83cd40012a"},{"rownum_":2,"code":"002","name":"人员2","mobile":"15011323234","refcode":"002","refpk":"de2d4d09-51ec-4108-8def-d6a6c5393c3b","id":"de2d4d09-51ec-4108-8def-d6a6c5393c3b","refname":"人员2","email":"22@11.com","key":"de2d4d09-51ec-4108-8def-d6a6c5393c3b"},{"rownum_":3,"code":"003","name":"人员3","mobile":"15011430232","refcode":"003","refpk":"004989bb-a705-45ce-88f3-662f87ee6e52","id":"004989bb-a705-45ce-88f3-662f87ee6e52","refname":"人员3","email":"33@33.com","key":"004989bb-a705-45ce-88f3-662f87ee6e52"},{"rownum_":4,"code":"004","name":"人员4","mobile":"15011430234","refcode":"004","refpk":"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd","id":"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd","refname":"人员4","email":"33@34.com","key":"3570cbde-0d43-49ce-ad53-ab27ee6ee7dd"},{"rownum_":5,"code":"005","name":"人员5","mobile":"15011430235","refcode":"005","refpk":"5e3a85ec-5e14-4734-8b3a-1e6168426c89","id":"5e3a85ec-5e14-4734-8b3a-1e6168426c89","refname":"人员5","email":"55@26.com","key":"5e3a85ec-5e14-4734-8b3a-1e6168426c89"},{"rownum_":6,"code":"006","name":"人员6","mobile":"15011323232","refcode":"006","refpk":"112621b9-b7ae-41b9-9428-61779334c5d6","id":"112621b9-b7ae-41b9-9428-61779334c5d6","refname":"人员6","email":"66@516.com","key":"112621b9-b7ae-41b9-9428-61779334c5d6"},{"rownum_":7,"code":"007","name":"人员7","mobile":"15011234567","refcode":"007","refpk":"394bba90-ed0f-4794-a44e-fd9ce6e9257d","id":"394bba90-ed0f-4794-a44e-fd9ce6e9257d","refname":"人员7","email":"55@4.com","key":"394bba90-ed0f-4794-a44e-fd9ce6e9257d"},{"rownum_":8,"code":"008","name":"人员8","mobile":"15011327890","refcode":"008","refpk":"a9f4c869-ca0b-4d12-847e-00eca08bfef6","id":"a9f4c869-ca0b-4d12-847e-00eca08bfef6","refname":"人员8","email":"55@556.com","key":"a9f4c869-ca0b-4d12-847e-00eca08bfef6"},{"rownum_":9,"code":"bpm01","name":"张一","mobile":"18777777777","refcode":"bpm01","refpk":"0dc47840-873a-4ed3-8ae7-c2335a76b385","id":"0dc47840-873a-4ed3-8ae7-c2335a76b385","refname":"张一","email":"bpm01@qq.com","key":"0dc47840-873a-4ed3-8ae7-c2335a76b385"},{"rownum_":10,"code":"bpm02","name":"张二","mobile":"18788888888","refcode":"bpm02","refpk":"c97b59e2-9fa3-44d7-93b0-1be52f7aa550","id":"c97b59e2-9fa3-44d7-93b0-1be52f7aa550","refname":"张二","email":"bpm02@qq.com","key":"c97b59e2-9fa3-44d7-93b0-1be52f7aa550"}];
        this.page ={
            pageCount : 11,//总页数
            pageSize : 10,//每页数据数
            totalElements:89,
            currPageIndex:0,
        };
    }
    onTreeChange = (record) =>{
        console.log(record)
        let condition;
        if(!record || !record.length) return;
        let item = record[0];
        if(item.entityType){
            condition = {
                refpk: item.refpk,
                entityType: item.entityType
            }
        }else{
            condition = record.map(item=>{
                return  item.refpk
            }).join(',')
        }
        this.tableData = this.tableData.length==0?this.originTableData:[];

        this.setState({
        	condition
        })
    }
    onTreeSearch = (value) =>{
        alert(value);
    }
    loadTableData=(param)=>{
        this.page.currPageIndex = param[`refClientPageInfo.currPageIndex`];
        this.setState({
            condition:++this.state.num,
            num:++this.state.num,
        })
    }
    onTableSearch = (value) =>{
        console.log('onTableSearch',value)
    }
    render() {
        let treeData = [{"code":"org1","children":[{"code":"bj","entityType":"mainEntity","name":"北京总部-简","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"bj","refpk":"5305416e-e7b4-4051-90bd-12d12942295b","id":"5305416e-e7b4-4051-90bd-12d12942295b","isLeaf":"true","refname":"北京总部-简"},{"code":"xd","entityType":"mainEntity","name":"新道-简","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"xd","refpk":"b691afff-ea83-4a3f-affa-beb2be9cba52","id":"b691afff-ea83-4a3f-affa-beb2be9cba52","isLeaf":"true","refname":"新道-简"},{"code":"yy3","entityType":"mainEntity","name":"test3","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"yy3","refpk":"e75694d9-7c00-4e9e-9573-d29465ae79a9","id":"e75694d9-7c00-4e9e-9573-d29465ae79a9","isLeaf":"true","refname":"test3"},{"code":"yy1","entityType":"mainEntity","name":"test1","pid":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refcode":"yy1","refpk":"fd32ceeb-57a8-4f44-816e-fa660f5715ab","id":"fd32ceeb-57a8-4f44-816e-fa660f5715ab","isLeaf":"true","refname":"test1"},{"code":"dept2","children":[{"code":"cs","entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"测试部-简","pid":"0ebbb6d8-250a-4d1d-a019-7ae951629a2c","refcode":"cs","refpk":"cc43a66a-438d-4106-937f-bec44406f771","id":"cc43a66a-438d-4106-937f-bec44406f771","isLeaf":"true","refname":"测试部-简"},{"code":"qd","entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"前端部-简","pid":"0ebbb6d8-250a-4d1d-a019-7ae951629a2c","refcode":"qd","refpk":"73a10edd-aae8-4f31-af25-1f48f0a3b344","id":"73a10edd-aae8-4f31-af25-1f48f0a3b344","isLeaf":"true","refname":"前端部-简"}],"entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"生产处","refcode":"dept2","refpk":"0ebbb6d8-250a-4d1d-a019-7ae951629a2c","id":"0ebbb6d8-250a-4d1d-a019-7ae951629a2c","refname":"生产处"},{"code":"dept1","children":[{"code":"dept1_2","entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"财务二科","pid":"95b60f35-ed0b-454e-b948-fb45ae30b911","refcode":"dept1_2","refpk":"55b7fff1-6579-4ca9-92b7-3271d288b9f3","id":"55b7fff1-6579-4ca9-92b7-3271d288b9f3","isLeaf":"true","refname":"财务二科"},{"code":"dept1_1","entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"财务一科","pid":"95b60f35-ed0b-454e-b948-fb45ae30b911","refcode":"dept1_1","refpk":"9711d912-3184-4063-90c5-1facc727813c","id":"9711d912-3184-4063-90c5-1facc727813c","isLeaf":"true","refname":"财务一科"}],"entityType":"subEntity","organization_id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","name":"财务处","refcode":"dept1","refpk":"95b60f35-ed0b-454e-b948-fb45ae30b911","id":"95b60f35-ed0b-454e-b948-fb45ae30b911","refname":"财务处"}],"entityType":"mainEntity","name":"用友集团","refcode":"org1","refpk":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","id":"a4cf0601-51e6-4012-9967-b7a64a4b2d47","refname":"用友集团"}]
        let {condition} = this.state;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div>
                <div className="demo-label">
                    <span >组织人员：</span>
                    <RefTreeTableWithInput
                        title='组织部门人员'
                        textOption={{
                            menuTitle: '组织',
                            tableTitle: '人员',
                        }}
                        param={{//url请求参数
                            refCode: 'neworgdeptstaff_treegrid',
                        }}
                        multiple={true}
                        refModelUrl={{
                            treeUrl: '/pap_basedoc/common-ref/blobRefTree',
                            refInfo: '/pap_basedoc/common-ref/refInfo',//表头请求
                            tableBodyUrl: '/pap_basedoc/common-ref/blobRefTreeGrid',//表体请求
                        }}
                        matchUrl='/pap_basedoc/common-ref/matchPKRefJSON'
                        filterUrl='/pap_basedoc/common-ref/filterRefJSON'
                        displayField='{refname}'
                        valueField='refpk'
                        lang='zh_TW'
                        {...getFieldProps('code', {
                            initialValue: '{"refname":"","refpk":""}',
                            rules: [{
                                message: '提示：请选择',
                                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
                            }]
                        })}
                        showLoding={false}
                        treeData={treeData} 
                        showLoading={false} 
                        onTreeChange={this.onTreeChange} 
                        onTreeSearch={this.onTreeSearch}
                        condition={condition}
                        columnsData={this.columnsData}
                        tableData={this.tableData}
                        page={this.page}
                        loadTableData={this.loadTableData}
                        onTableSearch={this.onTableSearch}
                    />
                    <span style={{
                        color: 'red'
                    }}>
                        {
                            getFieldError('code')
                        }
                    </span>
                    <Button  
                        colors="primary"
                        onClick={() => {
                        this.props.form.validateFields((err, values) => {
                            console.log(err, values)
                        });
                    }}>submit</Button>
                </div>
            </div>
        )
    }
};

export default Form.createForm()(Demo1);




```

## API

### RefTreeTableBaseUI Api
参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
title |``string``|空 |打开上传的模态框显示的标题文字 | 否
className |`string`|空 | 参照class样式，作用于弹出层和 RefTreeTableWithInput 输入框的样式以及左树右表外层类名，默认为空。 | 否
backdrop |`bool`| true |弹出层是否有模态层，true 显示，false 不显示 | 否
lang|`string`| `zh_TW` |多语配置，详情查看参数详解 | 否
buttons |`object`| `okText`: "确认", //确认按钮<br/>`cancelText`: "取消", //取消按钮<br/>`clearText`: "清空已选" //清空已选按钮|弹出层工具栏三个按钮的文字，若 
onSave |`function( record:object )`|-- |保存回调函数，返回已选择的记录详细数据。 | 否
onCancel | `function(  )`|-- |关闭弹出层 | 否
menuTitle | `String` | ''| 左树的标题| 否
tableTitle | `String` | '' | 右表的标题 | 否
showModal | `Boolean` | false | 参照是否展示。注意，当使用RefTreeTableWithInput 或者 搭配refcorewithinput使用时，showModal不需要配置  | 否

### RefTreeTableBaseUI 左树api
参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
searchable |`bool`|true |是否显示搜索框，弹出层是否带有搜索框，true 显示，false 不显示。 | 否
checkStrictly |`bool`|false|heckable状态下节点选择完全受控（父子节点选中状态不再关联）, false 关联选择，true 不关联| 否
nodeDisplay |<code>string 或 function</code>| `{refname}` |节点渲染时可匹配的内容，这里为了提供根据数据渲染节点图标使用 | 否
defaultExpandAll |`bool`|false |展开所有节点 true 展开，false 不展开。前提lazyModal是true| 否
showLine|`bool`|false |树组件是否有连线| 否
valueField |``string``|'refcode' |待提交的 value 的键。左树右表一致 | 否
showLoading | `bool` | false | 是否展示loading，多用于请求中| 否
onChange| `function(checkedArray)`| -- | 右表选中回调函数| 否
nodeDisplay|<code>string 或 function</code>|'{refname}' |记录中显示的键。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}| 否
treeData | `Array` | [] | 左树数据 | 否
onTreeChange | `function(checkedArray)` |()=>{} |选择树节点的回调，返回选中的树节点| 否 
onTreeSearch`function(searchVal)` |()=>{} |左树上的搜索| 否 

### RefTreeTableBaseUI 右表api
参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
multiple |`bool`| false |右表是否单选， true 单选，false 多选。左树总是单选 | 否
checkedArray| `array`|[]|已选择数据。注意，当使用RefTreeTableWithInput 或者 搭配refcorewithinput使用时，checkedArray这个参数不起效且初始值默认[] | 否
condition| `Object` | -- | 右表查询条件，带上左树信息。根据condition值不同来刷新页面| 否
columnsData | `Array` | [] | 右表列数据。具体参照tinper-bee的table组件 | 否
tableDataArray | [] | 右表表体数据。具体参照tinper-bee的table组件 | 否
page | `Object` | {pageCount:0,currPageIndex:0,totalElements:0}| 分页数据信息。 | 否
loadTableData | `function(param)`|()=>{}| 分页下拉或者跳转的回调，返回参数 | 否
onTableSearch| `function(valye)`|()=>{}| 表格搜索的回调|否


## RefWithInput  API
<span style="color: red; font-size: 15px;">注意：RefWithInput（ref-core）可以和RefTreeTableBaseUI配套使用，下面是RefWithInput可以接收的参数，以及RefWithInput给RefTreeTableBaseUI提供的参数</span>

### RefWithInput接收的参数

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
wrapClassName|`string`|空 | 文本框的class样，默认为空。 | 否
placeholder|`string`| 空 |文本框的 placeholder | 否
style| `object`| {width:200}| 文本框的style，默认宽度200px | 否 
filterUrl| `string`|空|快捷录入接口。|否
displayField |<code>string 或 function</code>|'{refname}' |记录中显示的键。<br/>当为字符串时则会根据`{}`包裹的增则匹配替换。<br/>如：`'人员姓名：{refname}，编号：{refcode}'`<br/>当为函数时则需自定义返回内容，参数为迭代已选择的记录。<br/>如：<br/>displayField: (record)=>  ${record.refname}-${record.refname}，是input展示value| 否
valueField |``string``|'refcode' |待提交的 value 的键。 | 否
value| ``string``|空|默认值，例如 `'{"refname":"初级-T1","refpk":"level1"}'`。|否
disabled|`bool`| false |禁用整个参照 | 否
onChange|`function(values, record)`|--|value改变、快捷录入和保存时数据回调|否
canClickGoOn|`function()`| ()=>{return true}|当点击文本框右侧弹出按钮时是否打开modal<br>适用于级联情况下当选择不全时的处理| 否 
canInputGoOn|`function()`| ()=>{return true}|当点击文本框触发快捷录入时是否可以录入<br>适用于级联情况下当选择不全时的处理| 否 

### RefWithInput提供的参数

参数 | 类型 |默认值| 说明 | 必选
---|---|--- | --- | ---
showModal | `bool` | false | 是否展示参照 ，true显示，false不显示| 否
onSave | `function(value)` | -- | 参照确定的回调，会更新checkedArray，showname（input的value），showModal关闭,最后回调RefWithInput接收的参数onSave| 否
onCancel | `function()` | -- | 参照取消的回调，会更新showModal关闭,最后回调RefWithInput接收的参数onCancel| 否
checkedArray | `Array` | [] | 选中的节点| 否
onMatchInitValue| `function(value)` | onMatchInitValue = (checkedArray) => {this.setState({checkedArray})} | 更改checkedArray | 否


## 注意事项
RefWithInput提供的参数可以保证参照组件的checkedArray更新以及参照showModal关闭打开，因此在使用RefWithInput就需要额外手动维护这两个参数


## 更新日志




## 树形参照分类

### RefTreeTableBaseUI (默认)
    树表的通用ui
    
### RefTreeTable
    
    参照弹出窗，没有输入框，使用时可根据自己需要定义具体的文本框。实质是RefCoreGlobal和RefTreeTableBase的组合

### RefTreeTableWithInput
    
    带文本框的参照弹出窗。在 RefTreeTable 基础上封装实现，RefWithInput和 RefTreeTable组合。

### createRefTreeTable
    
    非 ReactJS 调用方式，与 RefTreeTable 相同没有输入框，使用时可根据自己需要定义具体的文本框。

### createRefTreeTableModal

    非 ReactJS 调用方式，与  RefTreeTableWithInput 相同带文本框的参照弹出窗。



## 开发调试

```sh

$ cd 

ac-refer/packages/ref-tree-table

$ npm install

$ npm run dev

```