# worker 

worker 可以用于开启一个后台任务(子线程)，可以将一些比较重的计算任务放在 worker 中运行，避免前端页面卡死

```js
const worker = new Worker(aURL,options)
```

aURL: 指定worker将要执行脚本的url，它需要遵守同源策略

options：可以指定worker名称，用于区分多个worker（非必须）

* Worker.onerror 指定 error 事件的监听函数

* Worker.onmessage 指定 message 事件的监听函数，发送的数据保存在 event.data 中

* Worker.onmessageerror 指定 messageerror 事件的监听函数，发送的数据无法序列化成字符串时，会触发这个函数

* Worker.postMessage(): 向 Worker 线程发送信息

* Worker.terminate(): 立刻终止 Worker 线程

# 注意事项

1. 分配给 Worker 执行的脚本，必须与主线程脚本同源

2. Worker 线程与主线程不在同一个上下文环境，不能直接通信，只能通过消息完成

3. Worker 不能执行 alert() 和 confirm() 方法，但可以使用XMLHttpRequest发起ajax请求。

4. Worker 无法读取本地文件。

http://www.ruanyifeng.com/blog/2018/07/web-worker.html

