# 用自定义指令封装 dom 操作

https://cn.vuejs.org/v2/guide/custom-directive.html#%E7%AE%80%E4%BB%8B

## 钩子
 
 bind 只调用一次，第一次绑定到元素时调用
 
 inserted 被绑定的元素插入到父节点的时候使用
 
 update 所在的组件VNode更新的时候使用。可能发生在其子 VNode 更新之前。
 
 componentUpdated 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
 
 unbind 只调用一次，指令与元素解绑时使用
