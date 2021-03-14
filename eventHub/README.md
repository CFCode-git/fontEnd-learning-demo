# EventHub 发布订阅模式

确定 API

on(eventName,fn) 将fn推至this.cache[eventName]数组

emit(eventName,data) 取出this.cache[eventName]的fn逐个执行

off(eventName,fn) 移除this.cache[eventName]中的fn