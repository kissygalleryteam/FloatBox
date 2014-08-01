## 综述

FloatBox是一个简单的让你的某些元素在滚出视图后自动浮动在页面顶端的组件。

![](http://gtms04.alicdn.com/tps/i4/T1zF.lFDXaXXbjCIP0-514-500.png)

* 版本：1.0
* 作者：隐若
* demo：[http://kg.kissyui.com/FloatBox/1.0/demo/index.html](http://kg.kissyui.com/FloatBox/1.0/demo/index.html)

## 初始化组件
		
    S.use('kg/FloatBox/1.0/index', function (S, FloatBox) {
         var FloatBox = new FloatBox({
              container: '.J_FloatContainer', // 滚动的外层容器
              floats: '.J_FloatTitle'         // 需要浮动的元素钩子
         });
    })
