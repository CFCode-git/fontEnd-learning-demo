// {
// new 模拟实现
// function objectFactory(){
//   const obj = new Object()
//   const constructor = [].shift.call(arguments)
//   obj.__proto__ = constructor.prototype
//   constructor.apply(obj,arguments)
//   return obj
// }
// }

// {
//   function fn1(name,age){
//     this.strength = 60;
//     this.age = age
//     return {
//       name:name,
//       habit:'Games'
//     }
//   }
//
//   let f1 = new fn1('jack',18)
//
//   console.log(f1.name) // jack
//   console.log(f1.habit) // Games
//   console.log(f1.age) // undefined
//   console.log(f1.strength) // undefined
//
//   function fn2(name,age){
//     this.strength = 60;
//     this.age = age
//     return 'hello boy'
//   }
//
//
//   let f2 = new fn2('jack',18)
//
//   console.log(f2.name) // undefined
//   console.log(f2.habit) // undefined
//   console.log(f2.age) // 18
//   console.log(f2.strength) // 60
// }


// new 模拟实现
function objectFactory(){
  const obj = new Object()
  const constructor = [].shift.call(arguments)
  obj.__proto__ = constructor.prototype
  let result = constructor.apply(obj,arguments)
  return typeof result === 'object' ? (result || obj/*避免null*/) : obj
}

{
  function fn3(name,age){
    this.strength = 60;
    this.age = age
    return {
      name:name,
      habit:'Games'
    }
  }

  let f3 = objectFactory(fn3,'jack',18)

  console.log(f3.name) // jack
  console.log(f3.habit) // Games
  console.log(f3.age) // undefined
  console.log(f3.strength) // undefined

  function fn4(name,age){
    this.strength = 60;
    this.age = age
    return 'hello boy'
  }


  let f4 = objectFactory(fn4,'jack',18)

  console.log(f4.name) // undefined
  console.log(f4.habit) // undefined
  console.log(f4.age) // 18
  console.log(f4.strength) // 60

}
