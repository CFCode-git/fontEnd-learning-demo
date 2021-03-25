// 一个发布订阅器，用于存储对视图的更新事件
// sub : subscribe 订阅
class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub){ // 添加订阅
    this.subs.push(sub)
  }
  removeSub(sub){ // 移除订阅
    let index = this.subs.indexOf(sub)
    if(index!==-1){
      this.subs.splice(index,1)
    }
  }
  notify(){ // 逐个执行 watcher 的更新
    this.subs.forEach(sub=>sub.update())
  }
  depend(){
    Dep.target.addDep(this)
  }
}

export default Dep
