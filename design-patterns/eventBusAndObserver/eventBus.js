// 事件调度中心
class EventBus {
  constructor() {
    this.cache = {}
  }

  on(eventName, fn) {
    this.cache[eventName] = this.cache[eventName] || []
    this.cache[eventName].push(fn)
  }

  emit(eventName, data) {
    let array = this.cache[eventName] || []
    array.forEach(fn => {
      fn(data)
    })
  }

  off(eventName, fn) {
    if (!this.cache[eventName]) return
    let index
    for (let i = 0; i < this.cache[eventName].length; i++) {
      if (this.cache[eventName][i] === fn) {
        index = i
        break
      }
    }
    this.cache[eventName].splice(index, 1)
  }
}


// 创建事件调度中心
const eventHub = new EventBus ();

// 订阅事件，消息到了以后做一些事情
eventHub.on("xxx", (data) => {
  console.log(data)
});
eventHub.on("xxx", (data) => {
  console.log('hi',data)
});

// 消息的发送方，发布事件
eventHub.emit("xxx", "我可真**强");
// 发布事件
eventHub.emit("xxx", "again");
// 发布事件
eventHub.emit("xxx", "again 2");
