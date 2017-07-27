(function($) {

    "use strict";

    //default selecttree
    var defaultOptions = {
        width: 'auto',
        height: '300px',
        isSimpleNode: false, //是否启用简单的节点属性（id,ame）,次配置是form表单传递到后台的参数值，数据通过json传递
        pIcon: '',
        cIcon: '',
        debug: false,
        data: [{
            id: '111111',
            name: "父节点1",
            children: [
                { id: '22222', name: "子节点1" },
                { id: '33333', name: "子节点2" }
            ]
        }]
    }

    //define some global dom
    var SelectTree = function(element, options) {
        this.options = options;
        this.$element = $(element);
        this.$containner = $('<div></div>');
        this.$ztree = $('<ul class="ztree"></ul>');
        this.$pInput = $('<input type="hidden"/>');
    }

    //prototype method
    SelectTree.prototype = {
        constructor: SelectTree,

        init: function() {
            var that = this,
                st = this.$element;

            // style
            that.$containner.css({ 'display': 'inline-block', 'position': 'relative' });
            that.$ztree.css({ 'position': 'absolute', 'z-index': 10000, 'border-radius': '3px', 'border': '1px #ccc solid', 'overflow': 'auto', 'background': '#fff', 'margin-top': '10px' });
            that.$ztree.css({ 'width': this.options.width || that.defaultOptions.width });
            that.$ztree.css({ 'height': this.options.height || taht.defaultOptions.height });

            // dom
            if (that.$element.data('pname')) {
                that.$pInput.attr('name', that.$element.data('pname'));
            }
            if (that.$element.attr('name')) {
                that.$element.removeAttr('name');
            }
            that.$ztree.attr('id', 'selectTree-ztree');
            that.$ztree.css('display', 'none');
            that.$element.attr('readonly', 'readonly');
            st.wrap(that.$containner);
            st.after(that.$pInput);
            st.after(that.$ztree);

            //listener
            that.$element.bind('click', function(e) {
                that.$ztree.toggle();
            });

            //ztree 
            //listener
            this.options.ztree.setting.callback = {
                onCheck: function(event, treeId, treeNode) {
                    return that._onCheckTreeCheck(event, treeId, treeNode);
                }
            }
            $.fn.zTree.init(that.$ztree, this.options.ztree.setting, this.options.ztree.data);


        },
        _onCheckTreeCheck: function(event, treeId, treeNode) {
            var that = this;
            //获得所有选中节点
            var pValue = '',
                text = '';
            var treeObj = $.fn.zTree.getZTreeObj(that.$ztree.attr('id'));
            if (treeObj) {
                var nodes = treeObj.getCheckedNodes(true);
                if(this.options.debug){
                	console.log("选中的节点：");
                	console.log(nodes);
                }
                for (var i = 0; i < nodes.length; i++) {
                	if(nodes[i].isParent){
                		text = text + nodes[i].name + '：';
                	}else {
                		text = text + nodes[i].name + ',';
                	}
                }
                if (this.options.isSimpleNode) {
                    nodes = common._transformToSimpleNodes(nodes);
                }
                if(this.options.debug){
                	console.log("提交到表单到数据结构：");
                	console.log(JSON.stringify(nodes));
                }
                that.$pInput.val(JSON.stringify(nodes));
                that.$element.val(text ? text.substr(0, text.length - 1) : '');
            }
        }
    }

    var common = {
        //这里组织默认参数，用户传过来的参数,ztree的一些固定参数
        _getSelectTreeOptions: function(options) {
            options = options ? options : {};
            return {
                width: options.width || defaultOptions.width,
                height: options.height || defaultOptions.height,
                isSimpleNode: options.isSimpleNode || defaultOptions.isSimpleNode,
                pIcon: options.pIcon || defaultOptions.pIcon,
                cIcon: options.cIcon || defaultOptions.cIcon,
                debug: options.debug || defaultOptions.debug,
                ztree: {
                    data: options.data || defaultOptions.data,
                    setting: {
                        check: {
                            enable: true,
                            chkStyle: "checkbox",
                            chkboxType: { "Y": "ps", "N": "ps" }
                        }
                    }
                }
            }
        },
        //转换ztree几点为简单的节点，只包含id,name
        _transformToSimpleNodes: function(nodes) {
            var newNodes = [];
            if (nodes instanceof Array) {
                for (var i = 0; i < nodes.length; i++) {
                    var node = {};
                    node.id = nodes[i].id;
                    node.name = nodes[i].name;
                    newNodes.push(node);
                }
            }
            return newNodes;
        }
    }



    $.fn.selectTree = function(options) {
        var data = new SelectTree(this, common._getSelectTreeOptions(options));
        return data.init();
    }

    $.fn.selectTree.Constructor = SelectTree;

})(jQuery)