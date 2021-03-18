const myBind = require("../src/index.js");

function test1(message) {
  console.log(message);
  Function.prototype.myBind = myBind;
  console.assert(Function.prototype.myBind !== undefined);
}

function test2(message) {
  console.log(message);
  const fn1 = function () {
    return this;
  };
  Function.prototype.myBind = myBind;
  const newFn1 = fn1.myBind({ name: "Jack" });
  console.assert(newFn1().name === "Jack");
}

function test3(message) {
  console.log(message);
  const fn2 = function (p1, p2) {
    return [this, p1, p2];
  };
  const newFn2 = fn2.myBind({ name: "Jack" }, 123, 456);
  console.assert(newFn2()[0].name === "Jack");
  console.assert(newFn2()[1] === 123);
  console.assert(newFn2()[2] === 456);
}

function test4(message) {
  console.log(message);
  Function.prototype.myBind = myBind;
  const fn2 = function (p1, p2) {
    return [this, p1, p2];
  };
  const anotherFn2 = fn2.myBind({ name: "Jack" });
  console.assert(anotherFn2(111, 222)[0].name === "Jack");
  console.assert(anotherFn2(111, 222)[1] === 111);
  console.assert(anotherFn2(111, 222)[2] === 222);
}

function test5(message) {
  console.log(message);
  Function.prototype.myBind = myBind;
  const fn2 = function (p1, p2) {
    return [this, p1, p2];
  };
  const otherFn2 = fn2.myBind({ name: "Jack" }, 111);
  console.assert(otherFn2(222)[0].name === "Jack");
  console.assert(otherFn2(222)[1] === 111);
  console.assert(otherFn2(222)[2] === 222);
}

function test6(message) {
  console.log(message);
  Function.prototype.myBind = myBind;
  const fn = function (p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };
  const fn2 = fn.myBind(undefined, "x", "y");
  const object = new fn2();
  console.assert(object.p1 === "x", "x");
  console.assert(object.p2 === "y", "y");
}

function test7(message) {
  console.log(message);
  Function.prototype.myBind = myBind;
  const fn = function (p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };
  fn.prototype.sayHi = function () {};
  const fn2 = fn.myBind(undefined, "x", "y");
  const object = new fn2();
  console.assert(object.p1 === "x", "x");
  console.assert(object.p2 === "y", "y");
  console.assert(fn.prototype.isPrototypeOf(object));
  console.assert(typeof object.sayHi === "function");
}

function test8(message) {
  console.log(message);
  Function.prototype.myBind = myBind;
  const fn = function (p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };
  fn.prototype.sayHi = function () {};
  const obj1 = new fn("a", "b");
  const fn2 = fn.myBind(obj1, "x", "y");
  const object = fn2();
  console.assert(object === undefined, "undefined");
  console.assert(obj1.p1 === "x", "x");
  console.assert(obj1.p2 === "y", "y");
}

test1("fn.myBind 能用");
test2("this 绑定成功");
test3("this,p1,p2 绑定成功");
test4("this 绑定成功,透传 p1,p2");
test5("this,p1绑定成功,透传p2");
// test6("支持 new,绑定 p1,p2");
// test7("支持new, 绑定p1,p2,且支持在fn.prototype上添加属性sayHi");
// test8("myBind fn 本身构造的对象");
