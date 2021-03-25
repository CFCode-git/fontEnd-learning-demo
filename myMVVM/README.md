# 参考 Vue 原理实现一个 MVVM 框架

## 运行

```shell script
npm install
npm run watch
```

## Observer 观察者

## Watcher 监听者

## Dep 依赖

## Compiler 编译器

## view => model 的绑定

1. 在编译器Compiler中监听数据变化并绑定监听器Watcher;
2. 在观察者Observer中实现对所有数据的getter、setter;
3. 监听器Watcher把更新事件添加进Dep的事件队列中;
4. 观察者Observer发现数据产生变化的时候通知Dep;
5. Dep把事件队列中的更新事件全部执行一遍


## 第一步 Object.defineProperty 添加代理
