# axios 的封装思路

https://juejin.cn/post/6844903652881072141

axios 是基于 promise 的 http 库，它拥有许多优秀的特性，比如拦截请求和响应，取消请求，转换json，客户端防御 XSRF 等。

一般我们会在项目的src目录中新建一个 request 文件夹，新建 http.js 和 api.js 文件。

* http.js 用来封装 axios

* api.js 用来统一管理接口


## axios 配置的优先级

1. 在 lib/default.js 找到的库的默认值

2. 实例的 defaults 属性

3. 请求的 config 参数
