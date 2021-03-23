# Promise

Promises/A+
 
https://promisesaplus.com/

https://juejin.cn/post/6844903649852784647

## promise.allSettled 思路

使用 promise.then() 处理 promise，使所有 promise 成功。

成功返回 {status:'ok',value} , 失败返回 {status:'not ok',reason}

## src -- 手写 Promise wip 2.2.6

Promise 解决了什么问题？ 

回调地狱

Promise 的两个优点

* 减少缩进

* 错误处理，消灭 if else

### API

属性： length

类方法：all allSettled race reject resolve

对象属性：then finally catch

对象内部属性：state = pending fulfilled rejected

