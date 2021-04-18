// es7
{
  async function asyncPool(poolLimit,array,iteratorFn){
    const res = [] // 存储所有的异步任务
    const executing = [] // 存储正在执行的异步任务
    for(const item of array){
      // 调用 iteratorFn 函数创建异步任务
      const p = Promise.resolve().then(()=>iteratorFn(item,array))
      res.push(p) // 保存新的异步任务

      // 当 poolLimit 值小于或者等于总任务个数时，进行并发控制
      if(poolLimit<=array.length){
        // 当任务完成后，从正在执行的任务数组中移除已经完成的任务

        const e = p.then(()=>executing.splice(executing.indexOf(e),1))
        executing.push(e) // 保存正在执行的异步任务

        if(executing.length>= poolLimit){
          await Promise.race(executing) // 等待较快的任务执行完成
        }
      }
    }
    return Promise.all(res)
  }
}

// es6
{
  function asyncPool(poolLimit, array, iteratorFn) {
    let i = 0;
    const ret = []; // 存储所有的异步任务
    const executing = []; // 存储正在执行的异步任务
    const enqueue = function () {
      if (i === array.length) {
        return Promise.resolve();
      }
      const item = array[i++]; // 获取新的任务项
      const p = Promise.resolve().then(() => iteratorFn(item, array));
      ret.push(p);

      let r = Promise.resolve();

      // 当poolLimit值小于或等于总任务个数时，进行并发控制
      if (poolLimit <= array.length) {
        // 当任务完成后，从正在执行的任务数组中移除已完成的任务
        const e = p.then(() => executing.splice(executing.indexOf(e), 1));
        executing.push(e);
        if (executing.length >= poolLimit) {
          r = Promise.race(executing);
        }
      }

      // 正在执行任务列表 中较快的任务执行完成之后，才会从array数组中获取新的待办任务
      return r.then(() => enqueue());
    };
    return enqueue().then(() => Promise.all(ret));
  }
}