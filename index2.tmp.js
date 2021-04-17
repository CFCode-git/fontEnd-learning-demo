{
  // 封装一个http请求
  function ajax(method, url) {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.onreadystatechange = function () {
      if (xhr.status === 200 && xhr.readyState === 4) {
        return xhr.responseText
      } else if (xhr.status === 404) {
        //  找不到页面
      }
    }
    xhr.send()
  }
}

{
  // 原型链继承
  function Parent(color) {
    this.color = color
  }

  Parent.prototype.move = function () {
    console.log('i can move')
  }

  function Child(color, name) {
    Parent.apply(this, arguments)
    this.name = name
  }

  function Temp() { }

  temp.prototye = Parent.prototype
  Child.prototype = new Temp()
  Child.constructor = Child
  Child.prototype.say = function () {
    this.move()
    console.log('besides, i can say')
  }
}

{
  // class 继承
  class Parent {
    constructor(color) {
      this.color = color
    }

    move() {
      console.log('i can move')
    }
  }

  class Child extends Parent {
    constructor(color, name) {
      super(color)
      this.name = name
    }

    say() {
      this.move()
      console.log('besides, i can say')
    }
  }
}

{
  // eventBus
  class eventBus {
    constructor() {
      cache = {}
    }

    on(eventName, fn) {
      this.cache[eventName] = this.cache[eventName] || []
      this.cache[eventName].push(fn)
    }

    emit(eventName, data) {
      let fnArr = this.cache[eventName] || []
      fnArr.forEach(fn => {
        fn(data)
      })
    }

    off(eventName, fn) {
      if (!this.cache[eventName]) { return }
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

}

{
  // 深拷贝
  function deepClone(source, map = new WeakMap()) {
    if (source instanceof Object) {
      let dist
      if (map.get(source)) {return map.get(source)}
      if (source instanceof Array) {
        dist = new Array()
      } else if (source instanceof Function) {
        dist = function () {
          return source.apply(this, arguments)
        }
        dist.name = dist
      } else if (source instanceof RegExp) {
        dist = new RegExp(source.source, source.flags)
      } else if (source instanceof Date) {
        dist = new Date(source)
      } else {
        dist = new Object()
      }
      map.set(source, map)
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          dist[key] = deepClone(source[key], map)
        }
      }
      return dist
    }
    return source
  }

  // end
}

{
  // 类型判断
  let toString = Object.prototype.toString()

  function toType(obj) {
    if (typeof obj !== 'function' && typeof obj !== 'object') return typeof obj

    let instanceExp = /^\[object ([a-zA-Z]+)\]$/
    let value = instanceExp.exec(toString.call(obj))[1] || 'object'
    return value.toLowerCase
  }
}

{
  // new 实现
  function objectFactory() {
    const obj = new Object()
    const constructor = [].shift.call(arguments)
    obj.__proto__ = constructor.prototype
    let result = constructor.apply(obj, arguments)
    return typeof result === 'object' ? (result || obj) : obj
  }
}

{
  // bind  实现
  var slice = Array.prototype.slice

  function myBind(asThis) {
    var fn = this
    if (typeof fn !== 'function') {
      throw new Error('bindData 应该由函数调用')
    }
    var args1 = slice.call(arguments, 1)

    function resultFn() {
      var args2 = slice.call(arguments, 0)
      return fn.apply(
        resultFn.prototype.isPrototypeOf(this) ? this : asThis,
        args1.concat(args2)
      )
    }

    resultFn.prototype = fn.prototype
    return resultFn
  }
}

{
  // promise.allSettled
  const promiseListWrapper = (promiseList) =>
    promiseList.map(promise =>
      promise.then(
        (value) => ({status: 'ok', value}),
        (reason) => ({status: 'not ok', reason})
      )
    )

  Promise.allSettled2 = function (promiseList) {
    return Promise.all(promiseListWrapper(promiseList))
  }
}

{
  // lazyMan
  const LazyMan = (name) => {
    const queue = []
    const task = () => {
      console.log(`你好，我是${name}`)
      next()
    }
    queue.push(task)
    const next = () => {
      const first = queue.shift()
      first && first()
    }
    const api = {
      sleep(n) {
        const task = () => {
          setTimeout(() => {
            console.log(`我醒了，我刚刚睡了${n}秒`)
            next()
          }, n * 1000)
        }
        queue.push(task)
        return api
      },
      eat(food) {
        const task = () => {
          console.log(`吃${food}`)
          next()
        }
        queue.push(task)
        return api
      },
      sleepFirst(n) {
        const task = () => {
          setTimeout(() => {
            console.log(`我醒了，我刚刚睡了${n}秒`)
            next()
          }, n * 1000)
        }
        queue.unshift(task)
        return api
      },
    }
    setTimeout(() => {
      next()
    })
    return api
  }
}

{
  // memorize
  function memorize(a, b) {
    if (!memorize.cache) { memorize.cache = new Map() }
    const map = memorize.cache
    const aCache = map.get(a) || map.get(map.set(a, a.toString()))
    const bCache = map.get(b) || map.get(map.set(b, b.toString()))
    return aCache + bCache
  }
}

{
  function curry(fn, ...args1) {
    const length = fn.length
    args1 = args1 || []
    return function (...args2) {
      let args = args1.concat(args2)
      if (args.length < length) {
        return curry.call(this, fn, ...args)
      } else {
        return fn.call(this, ...args)
      }
    }
  }
}

