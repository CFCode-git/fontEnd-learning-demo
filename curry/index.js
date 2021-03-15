function curry(fn, ...args) {
  const length = fn.length; // fn 接受的参数个数
  args = args || [];
  // console.log(args)
  return function () {
    let _args = Array.prototype.slice.call(args, 0);
    let arg;
    for (let i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      _args.push(arg);
    }
    if (_args.length < length) {
      return curry.call(this, fn, ..._args);
    } else {
      return fn.apply(this, _args);
    }
  };
}

function testAdd(a, b, c, d) {
  console.log(a + b + c + d);
  return a + b + c + d;
}

const curried = curry(testAdd, 1, 2);
curried(4)(5, 6, 7, 8);
