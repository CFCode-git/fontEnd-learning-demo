# 插件

可以：

* 添加全局方法或者 property。如：vue-custom-element

* 添加全局资源：指令/过滤器/过渡等。如 vue-touch

* 通过全局混入来添加一些组件选项。如 vue-router

* 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。

* 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-router

通过全局方法 Vue.use() 使用插件。

开发 vue 插件需要暴露一个 install 方法。这个方法第一个参数是 Vue 构造器，第二个参数是可选的选项。
