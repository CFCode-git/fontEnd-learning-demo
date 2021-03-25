var slice = Array.prototype.slice;

function myBind(asThis) {
  var fn = this;
  if (typeof fn !== "function") {
    throw new Error("bindData 应该由函数调用");
  }
  var args1 = slice.call(arguments, 1);
  function resultFn() {
    var args2 = slice.call(arguments, 0);
    return fn.apply(
      resultFn.prototype.isPrototypeOf(this) ? this : asThis,
      args1.concat(args2)
    );
  }
  resultFn.prototype = fn.prototype;
  return resultFn;
}

function _myBind(asThis, ...args1) {
  // 这里的 this 就是 函数
  const fn = this;
  if (typeof fn !== "function") {
    throw new Error("bind应该调用在函数身上");
  }
  function resultFn(...args2) {
    // new 将临时对象作为 this 传到这里
    // this.p1 = p1
    // this.p2 = p2
    // this.__proto__ = resultFn.prototype
    // return this 没了
    return fn.call(
      resultFn.prototype.isPrototypeOf(this) ? this : asThis, // test 6 测试
      // (this instanceof resultFn) ? this : asThis,
      ...args1,
      ...args2
    );
  }
  resultFn.prototype = fn.prototype; // 这句话是为了保证 bindData 之后的原型是对的 看 test7 测试
  return resultFn;
}

module.exports = myBind;

// polyfill
if (!Function.prototype.bind) {
  Function.prototype.bind = myBind;
}
