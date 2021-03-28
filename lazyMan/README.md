# lazyMan 实现

keyword: 任务队列 调用链 工厂函数

实现一个LazyMan，可以按照以下方式调用:

```js
LazyMan(“Hank”)

Hi! This is Hank!
```
 
```js
LazyMan(“Hank”).sleep(10).eat(“dinner”)

Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~
```

```js
LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出

Hi This is Hank!
Eat dinner~
Eat supper~
```

```js
LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出

//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
 
```

以此类推。
