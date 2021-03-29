// 观察者
class Observer {
  update(...args){
    console.log(...args)
  }
}

// 观察目标(数据源)
class Subject{
  constructor() {
    this.observers = []
  }
  add(observer){
    this.observers.push(observer)
  }
  notify(...args){
    this.observers.forEach(observer=>observer.update(...args))
  }
}

// 创建 目标
const sub = new Subject()

// 创建 观察者
const observer1 = new Observer()
const observer2 = new Observer()
const observer3 = new Observer()
const observer4 = new Observer()

// 目标添加观察者
sub.add(observer1)
sub.add(observer2)
sub.add(observer3)
sub.add(observer4)

// 目标触发事件, 所有观察者都可以拿到 'hi' 这个 data
sub.notify('hi')





