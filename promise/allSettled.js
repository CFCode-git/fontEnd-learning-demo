// Promise.all

Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]).then((values) => console.log(values));

Promise.all([Promise.resolve(1), Promise.reject(2), Promise.reject(3)]).then(
  (values) => console.log(values),
  (error) => {
    console.log("error", error);
  }
);

// Promise.allSettled
Promise.allSettled([
  Promise.resolve(4),
  Promise.reject(5),
  Promise.reject(6),
]).then((values) => console.log(values));

// 实现 allSettled
const task1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("第1扇门关了");
    }, 3000);
  });
const task2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("第2扇门关了");
    }, 3000);
  });
const task3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("成功");
    }, 3000);
  });
// Range 1

Promise.all([
  task1().then(
    () => ({ status: "ok" }),
    () => ({ status: "not ok" })
  ),
  task2().then(
    () => ({ status: "ok" }),
    () => ({ status: "not ok" })
  ),
  task3().then(
    () => ({ status: "ok" }),
    () => ({ status: "not ok" })
  ),
]).then((values) => console.log(values));

const promiseResolveWrapper = (promise) =>
  promise.then(
    (value) => ({ status: "ok", value }),
    (reason) => ({ status: "not ok", reason })
  );

Promise.all([
  promiseResolveWrapper(task1()),
  promiseResolveWrapper(task2()),
  promiseResolveWrapper(task3()),
]).then((v) => console.log(v));

/////
const promiseListWrapper = (promiseList) =>
  promiseList.map((promise) =>
    promise.then(
      (value) => ({ status: "ok", value }),
      (reason) => ({ status: "not ok", reason })
    )
  );

Promise.all(promiseListWrapper([task1(), task2(), task3()])).then((v) =>
  console.log(v)
);

// allSettled 实现
Promise.allSettled2 = function (promiseList) {
  return Promise.all(promiseListWrapper(promiseList));
};

Promise.allSettled2([task1(), task2(), task3()]).then((v) =>
  console.log("allSettled 2", v)
);
