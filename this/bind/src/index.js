var slice = Array.prototype.slice;

function myBind(asThis) {
  var fn = this;
  if (typeof fn !== "function") {
    throw new Error("bind 应该由函数调用");
  }
  var args1 = slice.call(arguments, 1);
  return function () {
    var args2 = slice.call(arguments, 0);
    return fn.apply(asThis, args1.concat(args2));
  };
}

function _myBind(asThis, ...args1) {
  // 这里的 this 就是 函数
  const fn = this;
  if (typeof fn !== "function") {
    throw new Error("bind应该调用在函数身上");
  }
  return function (...args2) {
    return fn.call(asThis, ...args1, ...args2);
  };
}

module.exports = myBind;

// polyfill
if (!Function.prototype.bind) {
  Function.prototype.bind = myBind;
}
