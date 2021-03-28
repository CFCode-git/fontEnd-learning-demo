# lazyMan 实现

keyword: 

* 任务队列 -- 每次调用都不是执行函数，而是将要执行的东西做成一个 task， 放到任务队列 queue 中。
    
    setTimeout(next,0) 当所有任务放入 queue 中的时候，尽快执行第一个任务，同时每个任务执行之后，
    
    都要执行 next, next 的作用是取出第一个函数执行.

* 调用链 -- 类似 jQuery 一样，返回一个 api，里面是各种方法。每个函数的执行之后的返回值都是这个api

实现一个LazyMan，可以按照以下方式调用:

```js
LazyMan('Hank')

// Hi! This is Hank!
```
 
```js
LazyMan('Hank').sleep(10).eat('dinner')

// Hi! This is Hank!
// 等待10秒..
// Wake up after 10
// Eat dinner~
```

```js
LazyMan('Hank').eat('dinner').eat('supper')

// Hi This is Hank!
// Eat dinner~
// Eat supper~
```

```js
LazyMan('Hank').sleepFirst(5).eat('supper')

// 等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
 
```

以此类推。
