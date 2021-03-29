// round 1
// let wear = function(){
//   console.log('穿上第一件衣服')
// }
// let _wear1 = wear
// wear = function(){
//   _wear1()
//   console.log('穿上第二件衣服')
// }
// let _wear2 = wear
// wear = function(){
//   _wear2()
//   console.log('穿上第三件衣服')
// }
// wear()


// round 2 -- AOP 装饰函数
const after = (fn,afterFn)=>{
  return function(){
    fn.apply(this,arguments)
    afterFn.apply(this,arguments)
  }
}

const wear1 = function(){
  console.log('穿上第一件衣服')
}

const wear2 = function(){
  console.log('穿上第二件衣服')
}

const wear3 = function(){
  console.log('穿上第三件衣服')
}
const wear = after(wear1,after(wear2,wear3))
wear()
