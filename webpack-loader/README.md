# loader 

webpack 只能理解 JavaScript 和 JSON 文件，因此我们需要 loader 去处理其他类型的文件。比如 css/scss/less，比如图片。

loader 的本质就是一个导出函数的 node 模块。该函数会在 webpack 转换源模块的时候调用。调用的时候，该函数会得到处理模块的内容，可能是字符串，也可能是二进制。

## 使用本地loader

可通过 webpack.config.js 中定义 loader 的位置，webpack会自动查找是否存在对应的 loader

```js
// webpack.config.js
module.exports={
//......
  resolveLoader:{
    modules:['node_modules','./loaders']
  },
//......
}


```

## 如何获得 loader 的options

借助 webpack 提供的工具：loader-utils

```js
const loaderUtils = require('loader-utils');
module.exports = function(source) {
  // 获取到用户给当前 Loader 传入的 options
  const options = loaderUtils.getOptions(this);
  return source;
};
```


## 处理二进制数据

有时候需要给 loader 处理的不是文本文件，而是二进制文件，比如file-loader，webpack 会给 loader 传入二进制数据，此时需要设置 module.exports.raw = true

```js
module.exports = function(source) {
    // 在 exports.raw === true 时，Webpack 传给 Loader 的 source 是 Buffer 类型的
    source instanceof Buffer === true;
    // Loader 返回的类型也可以是 Buffer 类型的
    // 在 exports.raw !== true 时，Loader 也可以返回 Buffer 类型的结果
    return source;
};
// 通过 exports.raw 属性告诉 Webpack 该 Loader 是否需要二进制数据 
module.exports.raw = true;
```

## 异步 loader

异步的 loader 需要调用 this.async()

```js
module.exports = function(source) {
    // 告诉 Webpack 本次转换是异步的，Loader 会在 callback 中回调结果
    var callback = this.async();
    someAsyncOperation(source, function(err, result, sourceMaps, ast) {
        // 通过 callback 返回异步执行后的结果
        callback(err, result, sourceMaps, ast);
    });
};
```

## 缓存加速

webpack 默认会缓存 loader 的处理结果，以便于在被处理的文件没有发生变化的时候，不重新执行 loader 的操作。可以通过设置 this.cacheable(false) 不缓存。

```js
module.exports = function(source) {
  // 关闭该 Loader 的缓存功能
  this.cacheable(false);
  return source;
};
```
