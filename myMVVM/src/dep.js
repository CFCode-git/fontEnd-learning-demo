// 一个发布订阅器，用于存储对视图的更新事件
// sub : subscribe 订阅
let uid = 0
class Dep {
  constructor() {
    this.subs = [];
    this.id = uid++;
    // console.log('dep了一次,id是',this.id)
  }
  addSub(sub) {
    // 添加订阅
    this.subs.push(sub);
    // console.log('add 了',this.subs)
  }
  removeSub(sub) {
    // 移除订阅
    let index = this.subs.indexOf(sub);
    if (index !== -1) {
      this.subs.splice(index, 1);
    }
  }
  notify() {
    // 逐个执行 watcher 的更新
    console.log(this.subs);
    this.subs.forEach((sub) => sub.update());
  }
  depend() {
    Dep.target.addDep(this);
  }
}

export default Dep
