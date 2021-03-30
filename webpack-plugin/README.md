# plugin

webpack在整个编译周期会触发很多不同的事件，借助Tapable, plugin可以监听这些事件，在webpack执行的过程中做一些不一样的事情。

与loader不同，loader只是单纯的文件转换，plugin可以在整个编译周期中做各种事情。 

plugin 是一个具有 apply 方法的函数。

在编写 webpack plugin 的过程中，有两个重要的东西一定要知道。

## Compiler && Compilation

### Compiler

compiler 是编译器，他代表了完整的 webpack 环境配置，这个对象在 webpack 启动时会一次性创建，并配制好可以操作的设置，包括 options，loader 和 plugin。

当我们在 webpack 环境中应用一个插件的时候，插件会收到 compiler 的引用，通过它可以访问到 webpack 的主环境。


### Compilation

compilation 代表一次编译的过程，当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。

一个 compilation 对象表现了当前的模块资源，编译生成资源，变化的文件以及跟踪依赖的状态信息。

### 写一个监听文件变化的插件： 监听 watchRun 事件
