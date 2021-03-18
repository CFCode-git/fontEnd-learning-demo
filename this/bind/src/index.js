function myBind(asThis, ...args1) {
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
