# memorize

实现一个 memorize 函数， memorize(a,b)

```javascript
function memorize(a,b){
  // your code
  return a.toString() + b.toString()
}
```

* 参数 a b 可以是基本类型或者对象
  
* 多次调用 memorize 函数， 并且 a 和 b 参数不变，则不执行 toString() 逻辑， 直接返回之前缓存的结果。