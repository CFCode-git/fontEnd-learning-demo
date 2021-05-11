// function curry(fn, ...args) {
//   const length = fn.length; // fn 接受的参数个数
//   args = args || [];
//   // console.log(args)
//   return function () {
//     let _args = Array.prototype.slice.call(args, 0);
//     let arg;
//     for (let i = 0; i < arguments.length; i++) {
//       arg = arguments[i];
//       _args.push(arg);
//     }
//     if (_args.length < length) {
//       return curry.call(this, fn, ..._args);
//     } else {
//       return fn.apply(this, _args);
//     }
//   };
// }
//
// function testAdd(a, b, c, d) {
//   console.log(a + b + c + d);
//   return a + b + c + d;
// }
//
// const curried = curry(testAdd, 1, 2);
// curried(4)(5, 6, 7, 8);

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

  function add(a, b, c, d) {
    console.log(a + b + c + d)
    return a + b + c + d
  }

  //
  // const curried = curry(add)(1)(2)
  // curried(3, 4)
}


/*箭头函数柯里化*/
/*
 const join = (a, b, c) => {
   return `${a}_${b}_${c}`
}
 const curriedJoin = curry2(join)
 curriedJoin(1, 2, 3) // '1_2_3'
 curriedJoin(1)(2, 3) // '1_2_3'
 curriedJoin(1, 2)(3) // '1_2_3'
*/
{
  function curry2(fn) {
    return function curryInner(...args1) {
      if (args1.length >= fn.length) return fn(...args1)
      return (...args2) => curryInner(...args1, ...args2)
    }
  }
}


