
let obj = require('./index4.tmp')
console.log(obj.counter)
console.log(obj.obj)
obj.incCounter()
console.log(obj.counter)
console.log(obj.obj)
obj.obj.a +=1
console.log(obj)


// import {counter,incCounter} from './index4.tmp.mjs'
// console.log(counter)
// incCounter()
// console.log(counter)
