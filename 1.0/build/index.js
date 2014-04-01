/*
combined files : 

1.0/index

*/
/**
 * @fileoverview 
 * @author 隐若<yinruo.nyj@taobao.com>
 * @module float_box
 **/
KISSY.add('1.0/index',function (S, Node, DOM, Base) {

    /**
     * 浮动组建：当多个元素满足浮动条件时，只浮动最下方的元素
     * @param {Object} config
     * @param {String|element} config.floats 需要浮动的元素
     * @param {String|element} config.container 浮动的元素的外层容器
     * @class Float_box
     * @constructor
     * @extends Base
     */
    function Float_box(config) {
        var self = this;
        //调用父类构造函数
        Float_box.superclass.constructor.call(self, config);
        this._init.apply(this, arguments);
    }

    S.extend(Float_box, Base, /** @lends Float_box.prototype*/{

        _init: function( conf ) {
            var self = this;

            self.container = Node.one( conf.container || document.body );
            self.floats = self.container.all( conf.floats );

            self.bind();
        },

        /**
         * 做预先准备（创建placeholder）和添加滚动事件
         */
        bind: function() {
            var self = this;

            // 为所有的float添加placeholder
            this.floats.each(function( item ){
                var elPlaceholder = Node.one('<div class="fixed-placeholder"></div>');
                elPlaceholder.css({
                    height:0,
                    'margin-top':0,
                    overflow: 'hidden',
                    display: 'none'
                });
                item.after( elPlaceholder );
                item.data( 'fixedPlaceholder', elPlaceholder );
            });

            Node.one( window ).on( 'scroll', self.scrollEventHandler());
        },

        /**
         * 页面滚动时
         */
        scrollEventHandler: function() {

            var self = this;

            return function(){
                var needFloat = [];
                var needRelax = [];
                var theOne = null;

                // 先找出可能需要浮动的元素
                self.floats.each(function( item ){

                    if( self.needFloat( item ) ){
                        needFloat.push( item );
                    }
                    else {
                        needRelax.push( item );
                    }
                });

                // 从需要浮动的元素中找出最下方的元素进行浮动
                S.each( needFloat, function( item ){

                    if( !theOne || self.lower( item, theOne ) ){

                        // 不是最低的元素，就放到需要取消浮动的列表中
                        if( theOne ){
                            needRelax.push( theOne );
                        }

                        theOne = item;
                    }
                    else {
                        // 不是最低的元素，就放到需要取消浮动的列表中
                        needRelax.push( item );
                    }
                });

                // 对所有其他元素取消浮动
                S.each( needRelax, function( item ){
                    self.relaxItem( item );
                });

                // 浮动位置最低的元素
                if( theOne ){
                    self.floatItem( theOne );
                }
            }
        },

        /**
         * 比较itemA是否在itemB的下方
         * @param itemA
         * @param itemB
         */
        lower: function( itemA, itemB ){

            var itemAFloated = itemA.data( 'floated' );
            var itemAPlaceholder = itemA.data( 'fixedPlaceholder' );
            var itemBFloated = itemB.data( 'floated' );
            var itemBPlaceholder = itemB.data( 'fixedPlaceholder' );
            var itemAScrollTop = itemAFloated ? itemAPlaceholder.offset().top : itemA.offset().top;
            var itemBScrollTop = itemBFloated ? itemBPlaceholder.offset().top : itemB.offset().top;

            return itemAScrollTop > itemBScrollTop;
        },

        /**
         * 判断一个元素是否已经浮动
         * @param item
         * @returns {boolean}
         */
        needFloat: function( item ){

            var self = this;
            var floated = item.data( 'floated' );
            var placeholder = item.data( 'fixedPlaceholder');
            // 若已经在浮动，则检查其placeholder的位置，否则用当前数据
            var offsetTop = floated ? placeholder.offset().top : item.offset().top;

            var containerOffsetTop = self.container.offset().top;
            var docScrollTop = DOM.scrollTop();
            var containerHeight = self.container.outerHeight();

            /**
             * 需要浮动的范围：
             * 1、页面滚动超过当前元素的offset.top
             * 2、页面滚动还在container内部
             */
            return docScrollTop >= offsetTop  && docScrollTop <= ( containerOffsetTop + containerHeight ) ;
        },

        /**
         * 让某个元素浮动起来
         * @param item
         */
        floatItem: function( item ){

            if ( !item.data( 'floated' )) {

                var height = item.height();
                var width = item.width();
                var docScrollTop = DOM.scrollTop();

                item.css({
                    "z-index": 999,
                    "width": width
                });

                if ( S.UA.ie <= 6) {  // 解决IE6以下浏览器不支持position: fixed的问题
                    item.css({
                        "top": docScrollTop,
                        "position": "absolute"
                    });
                } else {
                    item.css({
                        "position": "fixed",
                        "top": 0
                    });
                }

                item.data( 'fixedPlaceholder' ).height( height ).show();
                item.data( 'floated', true );
            }
        },

        /**
         * 让某个元素静止
         */
        relaxItem: function( item ){

            if( item.data( 'floated' ) ){

                item.css({
                    position: 'static'
                });

                item.data( 'fixedPlaceholder').height( 0 ).hide();
                item.data( 'floated', false );
            }
        }
    }, {ATTRS : /** @lends Float_box*/{

    }});
    return Float_box;
}, {requires:['node', 'dom', 'base']});
