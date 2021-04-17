// ES7 的 decorator 语法

{
  const logWrapper = targetClass => {
    let orignRender = targetClass.prototype.render
    targetClass.prototype.render = function () {
      console.log('before render')
      orignRender.apply(this)
      console.log('after render')
    }
    return targetClass
  }

  @logWrapper
  class App {
    constructor() {
      this.title = '饥人谷首页'
    }

    render() {
      console.log('渲染页面:' + this.title)
    }
  }
}

// 修改 class 内部属性的 装饰器函数写法不太一样，需要 target name description 三个参数
{
  function logWrapper(target, name, descriptor) {
    console.log(arguments)
    let originRender = descriptor.value
    descriptor.value = function () {
      console.log('before render')
      originRender.bind(this)()
      console.log('after render')
    }
    console.log(target)
  }

  class App {
    constructor() {
      this.title = '饥人谷首页'
    }

    @logWrapper
    render() {
      console.log('渲染页面:' + this.title)
    }
  }

  new App().render()
}

// 原始写法
{
  const logWrapper = targetClass => {
    let orignRender = targetClass.prototype.render
    targetClass.prototype.render = function(){
      console.log("before render")
      orignRender.apply(this)
      console.log("after render")
    }
    return targetClass
  }


  class App {
    constructor() {
      this.title = '饥人谷首页'
    }
    render(){
      console.log('渲染页面:' + this.title);
    }
  }

  App = logWrapper(App)

  new App().render()
}
