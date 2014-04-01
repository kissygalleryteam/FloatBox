## 综述

Float Box是一个简单的让你的某些元素在滚出视图后自动浮动在页面顶端的组件。

![](http://gtms04.alicdn.com/tps/i4/T1zF.lFDXaXXbjCIP0-514-500.png)

* 版本：1.0
* 作者：隐若
* demo：[http://gallery.kissyui.com/float_box/1.0/demo/index.html](http://gallery.kissyui.com/float_box/1.0/demo/index.html)

## 初始化组件
		
    S.use('gallery/float_box/1.0/index', function (S, Float_box) {
         var float_box = new Float_box({
              container: '.J_FloatContainer', // 滚动的外层容器
              floats: '.J_FloatTitle'         // 需要浮动的元素钩子
         });
    })
