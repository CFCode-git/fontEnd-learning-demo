# 并发控制

https://github.com/rxaviers/async-pool


有10张图片url，有一个函数 loading，输入url，返回一个Promise，下载完成resolve，下载失败reject。

要求：同时下载不能超过3个，尽可能做到快的下载完所有图片

请实现如下的函数，可以批量请求数据，所有的 URL 地址在 urls 参数中，同时可以通过 max 参数控制请求的并发度，当所有请求结束之后，需要执行 callback 回调函数，发请求的函数可以直接使用 fetch 即可.

```ts
function sendRequest(urls: string[], max: number, callback: () => void) {

}
```
