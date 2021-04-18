# vue2 vuex vueRouter

## 路由钩子

组件：beforeRouteLeave >> 全局：beforeEach >> 组件：( beforeRouteUpdate) >> 路由独享：beforeEnter >> 组件：beforeRouteEnter >> 全局：beforeResolve >>
全局：afterEach >> 组件：beforeRouteEnter 的 next 回调

## keep-alive

缓存组件的状态，被 keep-alive 的组件不会再次初始化，也就意味着不会重新执行生命周期函数。

但是有时候我们希望 keep-alive 的组件可以再次进行渲染，于是 keep-alive 的组件多了两个钩子： activated　与　deactivated。

* activated 当 keep-alive 包含的组件再次渲染时触发。

* deactivated 当 keep-alive 包含的组件销毁时触发。

2.1.0 后，keep-alive 新增两个属性 ： include 与 exclude

* include 包含的组件缓存生效

* exclude 排除的组件不缓存

* max 缓存组件的最大值

https://juejin.cn/post/6844903918313406472

https://zhuanlan.zhihu.com/p/141733004

https://www.jianshu.com/p/af94f86da7b2

### keep-alive-demo

使用场景：频繁切换，不需要重复渲染，比如鼠标切换，tab切换组件等。

keep-alive 和 v-show 的区别：v-show是css层的处理，keep-alive是vue层的处理。

在 keep-alive-demo 中，可以注意到 count 并不是从 store 中取的值。如果不加 keep-alive，那么每次进入 keep-alive-demo 页面，count 就会重置为 0。

当我们添加了 keep-alive 之后，可以注意到 count 的值被缓存了下来，同时 keep-alive-demo 里面的 beforeCreate - mounted 的生命周期没有再次执行

### keep-alive 后的钩子顺序：

beforeRouteEnter >> created >> mounted >> activated >> deactivated

再次进入缓存的页面，只会触发 beforeRouteEnter >> activated >> deactivated 。

## 虚拟滚动

https://zhuanlan.zhihu.com/p/34585166

* 列表元素 .list-view 使用相对定位
* 使用一个不可见的元素 .list-view-phantom 撑起整个列表，让列表的滚动条出现。
* 列表的可见元素 .list-view-content 使用绝对定位，left top right 设置为 0

## <component :is="xxx"> 动态组件

使用场景：需要根据数据动态渲染的场景。

https://juejin.cn/post/6844903797538422798#heading-0

https://juejin.cn/post/6844904135863566349#heading-3

## 异步组件（按需加载）

import()

使用的时候再通过 ajax 加载
