import Compiler from './compiler'

class MVVM {
  constructor(options) {
    this.el = options.el
    this.data = options.data

    // data 属性代理到 vm 实例中
    Object.keys(this.data).forEach(key=>{
      this.setProxy(key)
    })

    // 编译节点
    new Compiler(this.el,this)
  }

  /**
   *
   * @param key data 对象中的每一个 key
   * @returns {*}
   * @desc
   * 对 data 对象中的每一个属性设置代理， 目标是 vm.data.xxx => vm.xxx
   */
  setProxy(key){
    Object.defineProperty(this,key,{
      get(){
        return this.data[key]
      },
      set(newValue){
        this.data[key] = newValue
      }
    })
  }
}


window.MVVM = MVVM
