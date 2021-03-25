import Watcher from './watcher'

class Compiler {
  constructor(el, vm) {
    this.el = document.querySelector(el)
    this.vm = vm

    // 创建节点副本 // 虚拟节点
    this.fragment = this.nodeToFragment(this.el)

    // 编译节点副本
    this.compileElement(this.fragment)

    // 插入编译（ 处理 ）后的文本结果
    this.el.appendChild(this.fragment)
  }

  /**
   * 创建节点副本
   * @param el 获取到的页面真实节点，此处为 #app 对应的 DOM
   * @desc
   * 创建一个虚拟节点
   * 遍历真实节点中的每一个子节点（ 包括元素节点和文本节点 ）
   * 循环所有子节点， 放入虚拟节点中。
   * @returns {DocumentFragment} 包含真实节点内部所有子节点的虚拟节点
   */
  nodeToFragment(el) {
    let fragment = document.createDocumentFragment()
    let children = el.childNodes
    // console.log(222,children)
    Array.from(children).forEach(childNode => {
      fragment.appendChild(childNode)
    })
    return fragment
  }

  /**
   * 编译节点副本
   * @param fragment 虚拟节点
   * @desc
   * 获取所有虚拟节点的子节点集合，通过遍历判断： 1=>元素节点； 3=>文本节点
   * 针对不同类型的节点选择性编译。
   * >> 文本节点，设置正则，如果文本节点中的元素带有双花括号，则进行文本编译
   * >> 元素节点，执行元素节点编译
   */
  compileElement(fragment) {
    let children = fragment.childNodes
    // console.log(111,children)
    Array.from(children).forEach(childNode => {
      if (childNode.nodeType === 1) {
        this.compileNodeElement(childNode)
      } else if (childNode.nodeType === 3) {
        this.compileTextNode(childNode)
      }
    })
  }

  compileTextNode(textNode) {
    let textList = this.compileText(textNode.textContent)
    let fragment = document.createDocumentFragment()
    let parent = textNode.parentNode

    textList.forEach(text => {
      let el  // 文本节点el
      if (text.tag) { // 表明是来自 data 的变量
        el = document.createTextNode('')
        // 传入空文本节点 el， 当前 vm，tag 文本，绑定类型
        directives.text(el,this.vm,text.value,'text')
      } else {
        el = document.createTextNode(text.value)
      }
      fragment.appendChild(el)
    })
    parent.replaceChild(fragment,textNode)
  }

  compileText(text) {
    let mustacheRe = /\{\{(.*?)\}\}/g
    let lastIndex = 0
    let textList = []  // 存储 text 分隔处理后的结果
    let match, value

    while ((match = mustacheRe.exec(text)) !== null) {
      // console.log(match)
      // match : ["{{xxx}}","xxx",index,input]
      // 得到 {{...}} 前面的普通文本放入 textList 中
      if (match.index > lastIndex) {
        // console.log(1)
        // console.log(text)
        // console.log(lastIndex, match.index)
        // console.log(2, text.slice(lastIndex, match.index))
        textList.push({
          value: text.slice(lastIndex, match.index)
        })
      }

      // 将 {{...}} 里面的键名作为 tag 传入 textList
      value = match[1]
      textList.push({
        value,
        tag: true
      })

      // 将 lastIndex 置为当前 {{...}} 之后
      lastIndex = match.index + match[0].length

      // console.log(textList)
    }

    // 由 lastIndex 与 文本长度 判断是否还有剩余文本，放入 textList 中
    if (lastIndex < text.length) {
      textList.push({
        value: text.slice(lastIndex)
      })
    }

    // console.log(textList)
    return textList

  }

  compileNodeElement(node) {
    let children = node.childNodes
    let attrs = node.attributes
    Array.from(attrs).forEach(attr=>{
      // 获取属性名字
      let name = attr.name
      // 判断是否存在指令
      if(name.indexOf('v-') > -1){
        // 获取指令的值和类型
        let value = attr.value
        let type = name.substring(2)
        directives[type](node,this.vm,value,type)
      }
    })
    // 当拥有子元素的时候进入 compileElement 进行节点的重新判断
    if(children && children.length>0){
      this.compileElement(node)
    }
  }
}

// 指令集合，包含 v-model， v-text，v-for 等指令
// node 当前节点， vm 当前实例, key data键值， type
const directives = {
  text(node,vm,key,type) {
    this.bindData(node,vm,key,'text')
  },
  model(node,vm,key,type){
    this.bindData(node,vm,key,type)
    /**
     * @desc
     * 当输入新内容时 对vm.data的相应属性旧值进行设置
     */
    node.addEventListener('input',e=>{
      updater.setVMData(vm,key,e.target.value)
    })
  },
  // 根据类型统一绑定数据
  bindData(node, vm, key, type) {
    // 获取 tag 文本，执行视图的更新
    let newVal = this.getVMData(vm,key)
    updater[type](node,key,newVal)
    // 在初始化绑定数据到视图的同时，添加对数据的监听器 Watcher
    new Watcher(vm,key,(newVal)=>{
      updater[type](node,key,newVal)
    })

  },
  // 获取 data 中的值
  getVMData(vm,key) {
    let keyArr = key.split('.')
    let value = vm
    keyArr.forEach(key=>{
      value = value[key]
    })
    return value
  }
}

const updater = {
  // 更新文本类型
  text(node,key,value) {
    node.textContent = value
  },
  // v-model
  model(node,key,value){
    node.value = value
  },
  setVMData(vm,key,newValue){
    let keyArr = key.split('.')
    let value = vm.data
    console.log(111,keyArr)
    console.log(111,keyArr.length)
    console.log(222,value)
    keyArr.forEach((key,i)=>{
      if(i === keyArr.length-1){ // 说明设置值的不是一个对象
        value[key] = newValue
      }else{ // 设置值的是一个对象
        value = value[key]
      }
    })
  }
}

export default Compiler
