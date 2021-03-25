/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compiler__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__observer__ = __webpack_require__(3);



class MVVM {
  constructor(options) {
    this.el = options.el
    this.data = options.data

    // 将 data 属性代理到 vm 实例中
    Object.keys(this.data).forEach(key=>{
      this.setProxy(key)
    })

    Object(__WEBPACK_IMPORTED_MODULE_1__observer__["a" /* default */])(this.data)

    // 编译节点 model => view
    new __WEBPACK_IMPORTED_MODULE_0__compiler__["a" /* default */](this.el,this)
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__watcher__ = __webpack_require__(2);


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
    new __WEBPACK_IMPORTED_MODULE_0__watcher__["a" /* default */](vm,key,(newVal)=>{
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

/* harmony default export */ __webpack_exports__["a"] = (Compiler);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dep__ = __webpack_require__(4);


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
    __WEBPACK_IMPORTED_MODULE_0__dep__["a" /* default */].target = this // 先暂时将 target 置为当前 watcher 实例，在之后触发该属性的getter时作为判断依据
    let value = this.getVMData() // 此函数读取旧值，触发该属性的 getter。
    // 该属性的 getter 触发后执行 dep.append()。
    // dep.append() 执行会调用 Dep.target.addDep(), 此时的target正是当前的watcher
    // 即调用了当前 watcher的 addDep，
    // addDep 接受的参数是 当前属性的 dep 实例
    // 触发 dep 的 addSub 函数，将当前 watcher 添加到 dep 实例的 subs 数组中
    // 至此，完成了收集该属性对应 watcher 的操作，整个过程真是妙啊
    __WEBPACK_IMPORTED_MODULE_0__dep__["a" /* default */].target = null // 置空 target， 用于下一次数据的依赖添加
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
/* harmony default export */ __webpack_exports__["a"] = (Watcher);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dep__ = __webpack_require__(4);


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
    let dep = new __WEBPACK_IMPORTED_MODULE_0__dep__["a" /* default */]()
    Object.defineProperty(data,key,{
      get(){
        // 如果 target 非空 表示改属性已经有监听器了 触发依赖添加事件 depend
        if(__WEBPACK_IMPORTED_MODULE_0__dep__["a" /* default */].target){ // Dep.target 就是被监听属性的 Watcher 实例
          dep.depend()
        }
        console.log(dep)
        return value
      },
      /**
       * @desc
       * 触发setter，dep.notify()将subs里面的watcher全部取出，执行其中的update回调
       * @param newValue
       */
      set(newValue){
        if(newValue===value)return
        console.log(`我被设置成了${newValue}`)
        value=newValue
        childObj = observer(newValue)
        dep.notify()
      }
    })
  }
}
/* harmony default export */ __webpack_exports__["a"] = (observer);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// 一个发布订阅器，用于存储对视图的更新事件
// sub : subscribe 订阅
let uid = 0
class Dep {
  constructor() {
    this.subs = []
    this.id = uid++
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

/* harmony default export */ __webpack_exports__["a"] = (Dep);


/***/ })
/******/ ]);