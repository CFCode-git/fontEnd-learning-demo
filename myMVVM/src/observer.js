import Dep from './dep'

// 观察者 Observer 中实现对所有数据的getter/setter
// 考虑到数据中含有嵌套对象，需要进行递归操作才能全部添加getter/setter
// 使用 Object.defineProperty, Observer 接受的参数是 data 对象

function observer(data){
  if(data && typeof data === 'object'){
    return new Observer(data)
  }
}

class Observer {
  constructor(data) {
    this.data = data
    Object.keys(data).forEach(key=>{
      this.bindDescriptor(data,key,data[key])
    })
  }
  bindDescriptor(data,key,value){
    // 递归操作
    //observer(value)
    let childObj = observer(value)
    let dep = new Dep()
    Object.defineProperty(data,key,{
      get(){
        // 如果 target 非空 表示改属性已经有监听器了 触发依赖添加事件 depend
        if(Dep.target){ // Dep.target 就是被监听属性的 Watcher 实例
          dep.depend()
        }
        console.log(dep)
        return value
      },
      set(newValue){
        if(newValue===value)return
        console.log(`我被设置成了${newValue}`)
        value=newValue
        dep.notify()
      }
    })
  }
}
export default observer
