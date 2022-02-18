layui.define(['jquery', 'table', 'form', 'laydate'], function(exports) {
    let $ = layui.jquery,
        table = layui.table,
        form = layui.form,
        laydate = layui.laydate;
    let timeSelectArr = [];
    let DataTable = function() {

    }

    DataTable.prototype.render = function(options) {

        if (options.table === undefined) {
            return console.error('table 参数错误');
        }

        let formWidth = options.form.width ? (options.form.width) : (800);
        let formPaneWidth = formWidth - 110;

        let html = '<div class="layui-card-header layui-table-card">' +
            '<form class="layui-form layui-table-form-filter" lay-filter="' + form.lay_filter + '" style="width:' + formWidth + 'px">';

        if (typeof options.filter !== undefined && options.filter.fields.length > 0) {
            $.each(options.filter.fields, (idx, item) => {
                let itemHtml = '<div class="layui-form-item">';
                itemHtml += '<label class="layui-form-label">' + item.label + '</label>'
                if (item.children !== undefined && item.children.length > 0) {
                    let childHtml = '<div class="layui-inline layui-form-item layui-form-pane" style="width: ' + formPaneWidth + 'px">';
                    $.each(item.children, (idx, childItem) => {
                        let pane = 'pane=""';
                        if (childItem.type === 'radio' || childItem.type === 'checkbox') {} else {
                            pane = ''
                        }
                        let childItemHtml = '<div class="layui-inline layui-form-item" ' + pane + '>';
                        childItemHtml += '<label class="layui-form-label" >' + childItem.label + '</label>';
                        switch (childItem.type) {
                            case 'input':
                                childItemHtml += '<div class="layui-input-inline" >';
                                childItemHtml += '<input type="text" name="' + childItem.field + '" autocomplete="off" class="layui-input">'
                                childItemHtml += '</div>';
                                break;
                            case 'select':
                                childItemHtml += '<div class="layui-input-inline"  pane=""><select name="quiz2">';
                                if (childItem.data !== undefined && childItem.data.length > 0) {
                                    $.each(childItem.data, function(idx, dataItem) {
                                        childItemHtml += '<option value="' + dataItem.value + '">' + dataItem.title + '</option>';
                                    })
                                }
                                childItemHtml += '</select></div>';
                                break;
                            case 'checkbox':
                                childItemHtml += '<div class="layui-input-inline"  >';
                                if (childItem.data !== undefined && childItem.data.length > 0) {
                                    $.each(childItem.data, function(idx, dataItem) {
                                        childItemHtml += '<input type="checkbox" name="' + item.field + '[' + dataItem.value + ']" lay-skin="primary" title="' + dataItem.title + '">';
                                    })
                                }
                                childItemHtml += '</div>';
                                break;
                            case 'radio':
                                childItemHtml += '<div class="layui-input-inline">';
                                if (childItem.data !== undefined && childItem.data.length > 0) {
                                    $.each(childItem.data, function(idx, dataItem) {
                                        childItemHtml += '<input type="radio" name="' + childItem.field + '" value="' + dataItem.value + '" title="' + dataItem.title + '">';
                                    })
                                }
                                childItemHtml += '</div>';
                                break;
                            default:
                                break;
                        }
                        childItemHtml += '</div>';
                        childHtml += childItemHtml;
                    });
                    childHtml += '</div>'
                    itemHtml += childHtml;
                } else {
                    switch (item.type) {
                        case 'input':
                            itemHtml += '<div class="layui-input-block">';
                            itemHtml += '<input type="text" name="' + item.field + '" autocomplete="off" class="layui-input">';
                            itemHtml += '</div>';
                            break;
                        case 'checkbox':
                            itemHtml += '<div class="layui-input-block"  pane="">';
                            if (item.data !== undefined && item.data.length > 0) {
                                $.each(item.data, function(idx, dataItem) {
                                    itemHtml += '<input type="checkbox" name="' + item.field + '[' + dataItem.value + ']" lay-skin="primary" title="' + dataItem.title + '">';
                                })
                            }
                            itemHtml += '</div>';
                            break;
                        case 'radio':
                            itemHtml += '<div class="layui-input-block"  pane="">';
                            if (item.data !== undefined && item.data.length > 0) {
                                $.each(item.data, function(idx, dataItem) {
                                    itemHtml += '<input type="radio" name="' + item.field + '" value="' + dataItem.value + '" title="' + dataItem.title + '">';
                                })
                            }
                            itemHtml += '</div>';
                            break;
                        case 'date_range':
                            itemHtml += '<div class="layui-inline"  pane="">';
                            itemHtml += '<input type="text" name="' + item.field + '[]" id="date_range_' + timeSelectArr.length + '" autocomplete="off" class="layui-input layui-input-inline">';
                            timeSelectArr.push({
                                id: 'date_range_' + timeSelectArr.length,
                                type: 'datetime',
                                range: false
                            });
                            itemHtml += '<div class="layui-input-inline" style="width: 10px;text-align: center;line-height: 2;">-</div>'
                            itemHtml += '<input type="text" name="' + item.field + '[]" id="date_range_' + timeSelectArr.length + '" autocomplete="off" class="layui-input layui-input-inline">';
                            timeSelectArr.push({
                                id: 'date_range_' + timeSelectArr.length,
                                type: 'datetime',
                                range: false
                            })
                            itemHtml += '</div>';

                            break;
                        default:
                            break;
                    }
                }
                itemHtml += '</div>';
                html += itemHtml;
            });

        }

        let btnHtml = '';

        if (options.form.btn !== undefined && options.form.btn.length > 0) {
            $.each(options.form.btn, function(bKey, item) {
                btnHtml += '<button class="layui-btn layui-btn-primary" lay-submit lay-filter="' + item.lay_filter + '">' + item.name + '</button>';
            })
        }

        html += '<div class="layui-form-item" pane="">' +
            ' <label class="layui-form-label"></label>' +
            '<div class="layui-input-block"><div class="layui-inline">' +
            '<button class="layui-btn" type="reset">重置</button>' +
            '<button class="layui-btn layui-btn-primary" lay-submit lay-filter="' + options.form.lay_filter + '" >搜索</button>' +
            btnHtml +
            '</div></div></div>';

        html += '</form></div>';
        html += '<div class="layui-card-body">' +
            '<table class="layui-hide" id="' + options.table.elem.replace('#', '') + '"></table>' +
            '</div></div>';

        $(options.el).addClass('layui-card layui-table-form-card').html(html);
        form.render();

        timeSelectArr.map(function(item) {
            //日期时间范围
            laydate.render({
                elem: '#' + item.id,
                type: item.type,
                range: item.range,
                done: function(value, date, endDate) {
                    console.log(1)
                },
                ready: function(date) {
                    // $(".layui-laydate-content tr .laydate-selected").each(function () {
                    //     if (!$(this).next().hasClass('layui-this') ){
                    //         if ($(this).next().hasClass('laydate-selected') && $(this).next().hasClass('laydate-day-next')){
                    //             $(this).addClass('last-selected');
                    //         }
                    //     }
                    //     if (!$(this).prev().hasClass('layui-this')){
                    //         if ($(this).prev().hasClass('laydate-selected') && $(this).prev().hasClass('laydate-day-prev')){
                    //             $(this).addClass('first-selected');
                    //         }
                    //     }
                    // });
                    //
                    // $(".layui-laydate-content tr .layui-this").each(function () {
                    //     if ($(this).next().hasClass('laydate-selected') && !$(this).next().hasClass('laydate-day-next')){
                    //         $(this).addClass('has-next-select');
                    //     }
                    //     if ($(this).prev().hasClass('laydate-selected') && !$(this).prev().hasClass('laydate-day-prev')){
                    //         $(this).addClass('has-prev-select');
                    //     }
                    // })
                    // $(".layui-laydate-content tr td").mouseenter(function () {
                    //     $(".layui-laydate-content tr .layui-this").each(function () {
                    //         if ($(this).next().hasClass('laydate-selected') && !$(this).next().hasClass('laydate-day-next')){
                    //             if ($(this).hasClass('has-prev-select')){
                    //                 $(this).removeClass('has-prev-select');
                    //             }
                    //             if ($(this).hasClass('has-next-select')){
                    //                 return;
                    //             }
                    //             $(this).addClass('has-next-select');
                    //         }
                    //         if ($(this).prev().hasClass('laydate-selected') && !$(this).prev().hasClass('laydate-day-prev')){
                    //             if ($(this).hasClass('has-next-select')){
                    //                 $(this).removeClass('has-next-select');
                    //             }
                    //             if ($(this).hasClass('has-prev-select')){
                    //                 return;
                    //             }
                    //             $(this).addClass('has-prev-select');
                    //         }
                    //     })
                    // })
                }
            });
        })

        let tableObj = table.render(options.table);

        if (options.form !== undefined && options.form.lay_filter !== undefined) {

            form.on('submit(' + options.form.lay_filter + ')', function(data) {
                console.log(data.elem);
                console.log(data);
                tableObj.reload({
                    where: data.field,
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                })
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });

            if (options.form.btn !== undefined && options.form.btn.length > 0) {
                $.each(options.form.btn, function(bKey, item) {
                    if (item.lay_filter !== undefined) {
                        form.on('submit(' + item.lay_filter + ')', function(data) {
                            if (typeof item.onclick === 'function') {
                                item.onclick(data);
                                return false;
                            }
                            if (item.url !== undefined) {
                                let method = item.method ? item.method : "GET";
                                if (item.query !== undefined && typeof item.query === 'object') {
                                    $.extend(true, data.field, item.query);
                                }
                                $.ajax({
                                    url: item.url,
                                    type: method,
                                    data: data.field,
                                    success: function(res) {
                                        if (typeof item.success === 'function') {
                                            item.success(res);
                                        } else {
                                            // notify.success(res.message ? res.message : '操作成功');
                                        }
                                    },
                                    error: function(res) {
                                        if (typeof item.error === 'function') {
                                            item.error(res);
                                        } else {
                                            // notify.success(res.message ? res.message : '操作失败');
                                        }
                                    }
                                })
                                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                            }
                        });
                    }
                })
            }
        }
    }

    let dataTable = new DataTable();
    exports('dataTable', dataTable);
}).addcss('dataTable.css?v=0.0.1', 'dataTable.css')