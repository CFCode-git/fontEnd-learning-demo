import EventHub from "../src/index";

type TestCase = (message: string) => void;

const test1: TestCase = (message) => {
  const eventHub = new EventHub();
  console.assert(eventHub instanceof Object, "eventHub是个对象");
  console.log(message);
};

const test2: TestCase = (message) => {
  const eventHub = new EventHub();
  // on emit
  let called = false;
  eventHub.on("xxx", (y) => {
    called = true;
    console.assert(y === "我可真**强");
  });
  eventHub.emit("xxx", "我可真**强");
  console.assert(called);
  console.log(message);
};

// off
const test3: TestCase = (message) => {
  const eventHub = new EventHub();
  let called = false;
  const fn1 = () => {
    called = true;
  };
  eventHub.on("yyy", fn1);
  eventHub.off("yyy", fn1);
  eventHub.emit("yyy");
  console.assert(called === false);
  console.log(message);
};

test1("EventHub 可以创建对象");
test2("on 了之后 emit 可以触发on的函数");
test3("off 有用");
