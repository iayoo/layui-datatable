# Layui DataTable 

> 基于 Layui 的数据表格封装，绑定搜索表单，减少每次编写表单的内容，方便维护

### 依赖

- Layui 2.6.8

### 截图

[截图示例](./images/demo_datatable.png)

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
