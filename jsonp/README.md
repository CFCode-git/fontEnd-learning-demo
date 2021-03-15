# 跨域解决方案之一 jsonp 

创建一个随机数作为函数名, 通过 callback 发送给服务端.

服务端接受到请求后, 通过 query 拿到函数名, 并将函数名和数据拼接成 js 文件返回; 文件内容是一个回调函数, 调用的结果就是数据.

前端构造 script 标签, src为请求路径, 监听 script 的 onload 事件, 加载完毕后移除 script 标签.

前端执行回调函数后可以得到数据.

后端可以通过 referer 或者 cookie 等手段判断是否分享数据

后端也可以设置 Access-control-allow-origin 设置跨域允许源