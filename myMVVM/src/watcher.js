import Dep from './dep'

class Watcher {
  constructor(vm,key,callback) {
    this.vm = vm
    this.exp = key
    this.cb = callback

    this.depIds = {} // {dep.id:dep实例}

    this.oldValue = this.get() // get 函数执行的结果是会把当前属性对应的watcher实例添加到对应的Dep数组中
  }
  addDep(dep){
    if(!this.depIds.hasOwnProperty(dep.id)){ // 有dep.id说明该属性的 watcher 添加过了
      dep.addSub(this) // dep 实例添加 当前 watcher
      this.depIds[dep.id] = dep
    }
  }
  get(){
    Dep.target = this // 先暂时将 target 置为当前 watcher 实例，在之后触发该属性的getter时作为判断依据
    let value = this.getVMData() // 此函数读取旧值，触发该属性的 getter。
    // 该属性的 getter 触发后执行 dep.append()。
    // dep.append() 执行会调用 Dep.target.addDep(), 此时的target正是当前的watcher
    // 即调用了当前 watcher的 addDep，
    // addDep 接受的参数是 当前属性的 dep 实例
    // 触发 dep 的 addSub 函数，将当前 watcher 添加到 dep 实例的 subs 数组中
    // 至此，完成了收集该属性对应 watcher 的操作，整个过程真是妙啊
    Dep.target = null // 置空 target， 用于下一次数据的依赖添加
    return value
  }

  /**
   * @desc
   * 1. 首先获取需要读取的属性名（key值）
   * 2. 读取该属性，同时触发了该属性的getter，触发该属性的 getter 时
   * 跳转到 observer 中
   *
   * 3. 该步骤完结后，vm.data的每一个属性都被绑定到了 watcher 实例中
   * 然后该 watcher 实例又被放入了一个 dep 实例中。
   * @returns {*}
   */
  getVMData(){
    let keyArr = this.exp.split('.')
    let value = this.vm
    keyArr.forEach(key=>{
      value = value[key]
    })
    return value
  }

  /**
   * @desc
   * 更新视图的时候，需要获取当前属性的newValue，作为参数放入回调函数中，
   */
  update(){
    let newValue = this.get()
    let oldValue = this.oldValue
    this.oldValue = newValue
    this.cb.call(this.vm,newValue,oldValue)
  }
}
export default Watcher
