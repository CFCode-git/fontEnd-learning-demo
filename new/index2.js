function objFactory(){
  let newObject = null
  let constructor = Array.prototype.shift.call(arguments)
  let result = null
  // 判断参数是否是一个函数
  if(typeof constructor !== 'function'){
    console.error('type error')
    return
  }
  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype)
  // 将 this 指向新建的对象，并执行函数
  result = constructor.apply(newObject,arguments)
  // 判断并返回对象
  let flag = result && (typeof result === 'object' || typeof result === 'function')
  // 判断返回结果
  return flag ?  result : newObject
}

{
  function objectFactory(){
    const obj = new Object()
    const constructor = [].shift.call(arguments)
    obj.__proto__ = constructor.prototype
    let result = constructor.apply(obj,arguments)
    return typeof result === 'object' ? (result || obj/*避免null*/) : obj
  }
}


{
  function objFactory(){
    let newObject = null
    let result = null
    let constructor = [].shift.call(arguments)
    if(typeof constructor !== 'function'){
      console.error('type error')
      return
    }
    newObject=Object.create(constructor.prototype)
    result = constructor.apply(newObject,arguments)
    let flag = result && (typeof result === 'object' || typeof result === 'function')
    return flag ? result : newObject
  }
}
