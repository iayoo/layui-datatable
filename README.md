# Layui DataTable 

> 基于 Layui 的数据表格封装，绑定搜索表单，减少每次编写表单的内容，方便维护

根据配置信息生成form表单，自动绑定搜索事件，数据表格刷新搜索等

### 依赖

- Layui 2.6.8

### 截图

![截图示例](./images/demo_datatable.png)

### 使用说明

```js
// html 
<div id="test_datatable_filter"></div>

// js
layui.config({
    base: './plugin/', //静态资源所在路径
    dir: './plugin/'
}).use(['dataTable'], function() {
    let dataTable = layui.dataTable;
    dataTable.render({
        el:"#test_datatable_filter"
    })
});

```


- render 参数说明

| 配置字段 | 备注说明     | 字段类型 | 示例值  |
|------|----------|----|----|
| el | 对象ID | string | #test |
| form | 搜索表单配置字段 | object | {} |
| form.lay_filter | 表单绑定的lay-filter | string | form_test |
| form.btn | 扩展的表单按钮配置 | array | `[{name:'导出',lay_filter:'test',url:'test',method:'POST',query:{is_export:1}}]`|
| form.btn.name | 按钮显示的内容 | string | form_test |
| form.btn.lay_filter | 按钮绑定的lay-filter | string | form_test |
| form.btn.url | 按钮提交的url | string | form_test |
| form.btn.method | 请求方式 | string | `GET|POST` |
| form.btn.query | 请求参数扩展 | object | `{is_export:1}` |
| form.btn.onclick | 按钮点击回调函数 | function |  |

- 完成参数示例

```js

let config = {
    el: "#form_filter",
    form: {
        lay_filter: 'table-search',
        btn:[
            {
                name:'导出',
                lay_filter:'test',
                url:'test',
                method:'POST',
                query:{is_export:1}
            }
        ]
    },
    filter: {
        fields: [
            {
                label: '用户信息',
                children: [
                    {type: 'input', label: '用户名', field: 'username', children: []},
                    {type: 'input', label: '手机号', field: 'phone', children: []}
                ]
            },
            {
                label: '订单信息',
                children: [
                    {type: 'input', label: '订单编号', field: 'order_sn', children: []},
                    {type: 'input', label: '订单ID', field: 'order_id', children: []}
                ]
            },
            {
                label: '下拉框',
                children: [
                    {type: 'select', label: '下拉框1', field: 'order_sn', data: [
                            {value: '1', title: '待付款'},
                            {value: '2', title: '已付款'},
                            {value: '3', title: '待发货'},
                            {value: '4', title: '已发货'},
                            {value: '5', title: '已取消'},
                            {value: '6', title: '已完成'},
                        ]},
                    {type: 'select', label: '下拉框2', field: 'order_id', data: [
                            {value: '1', title: '待付款'},
                            {value: '2', title: '已付款'},
                            {value: '3', title: '待发货'},
                            {value: '4', title: '已发货'},
                            {value: '5', title: '已取消'},
                            {value: '6', title: '已完成'},
                        ]}
                ]
            },
            {
                label: '单(多)选',
                children: [
                    {type: 'radio', label: '单选', field: 'order_sn', data: [
                            {value: '1', title: '待付款'},
                            {value: '2', title: '已付款'},
                        ]},
                    {type: 'checkbox', label: '多选', field: 'order_id', data: [
                            {value: '1', title: '待付款'},
                            {value: '2', title: '已付款'},
                            {value: '3', title: '待发货'},
                        ]}
                ]
            },
            {label: '商品信息', field: 'product', type: 'input'},
            {
                label: '下单时间',
                field: 'order_time',
                type: 'date_range'
            },
            {
                label: '订单状态',
                field: 'order_status',
                type: 'checkbox',
                data: [
                    {value: '1', title: '待付款'},
                    {value: '2', title: '已付款'},
                    {value: '3', title: '待发货'},
                    {value: '4', title: '已发货'},
                    {value: '5', title: '已取消'},
                    {value: '6', title: '已完成'},
                ]
            },
            {
                label: '单选',
                field: 'order_status',
                type: 'radio',
                data: [
                    {value: '1', title: '待付款'},
                    {value: '2', title: '已付款'},
                    {value: '3', title: '待发货'},
                    {value: '4', title: '已发货'},
                    {value: '5', title: '已取消'},
                    {value: '6', title: '已完成'},
                ]
            },
        ]
    },
    table: {
        elem: '#test'
        , url: '{:url("inputTable")}'
        , cols: [[
            {field: 'id', width: 80, title: 'ID', sort: true}
            , {field: 'username', width: 80, title: '用户名'}
            , {field: 'sex', width: 80, title: '性别', sort: true}
            , {field: 'city', width: 80, title: '城市'}
            , {field: 'sign', title: '签名', minWidth: 150}
            , {field: 'experience', width: 80, title: '积分', sort: true}
            , {field: 'score', width: 80, title: '评分', sort: true}
            , {field: 'classify', width: 80, title: '职业'}
            , {field: 'wealth', width: 135, title: '财富', sort: true}
        ]]
        , page: true
    },
    table_action:[
        {}
    ]
}

```