class Promise2 {
  // 存储 then 调用的 第一个参数 和 第二个参数
  state = 'pending';
  callbacks = [];

  // succeed 和 fail 的执行函数
  resolve(result) {
    nextTick(() => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.callbacks.forEach(handle => {
        if (typeof handle[0] === 'function') {
          let x;
          try { // 有可能报错，报错的话将错误传给 返回的新 promise 给 reject 掉
            x = handle[0].call(undefined, result);
          } catch (e) {
            return handle[2].reject(e);
          }
          handle[2].resolveWith(x);
        }
      });
    });
  };

  reject(reason) {
    nextTick(() => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.callbacks.forEach(handle => {
        if (typeof handle[1] === 'function') {
          let x;
          try {
            x = handle[1].call(undefined, reason);
          } catch (e) {
            return handle[2].reject(e);
          }
          handle[2].resolveWith(x);
        }
      });
    });
  };

  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('promise 需接受一个函数作为参数');
    }

    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  then(succeed?, fail?) {
    const handle = [null, null, null]; // 成功 失败 后续的promise
    if (typeof succeed === 'function') {
      handle[0] = succeed;
    }
    if (typeof fail === 'function') {
      handle[1] = fail;
    }
    handle[2] = new Promise2(() => {}); // handle[2] 是每次执行 then 后返回的新的 promise
    this.callbacks.push(handle);
    return handle[2];
  }

  resolveWith(x) {
    if (this === x) { // this 是 handle[2] 对应的 promise2 实例； x 是 上一次 promise 执行 then 后的返回结果
      this.reject(new TypeError());
    } else if (x instanceof Promise2) {
      // 如果上一次 promise 返回的结果 x 也是 promise
      // 若 x 是 fulfilled， handle[2] 也成功
      // 若 x 是 rejected, handle[2] 也失败
      x.then((result) => {
        this.resolve(result);
      }, (reason) => {
        this.reject(reason);
      });
    } else if (x instanceof Object) {
      let then;
      try {
        then = x.then;
      } catch (e) {
        this.reject(e);
      }
      if (then instanceof Function) {
        try {
          then.call(x, (y) => {
            this.resolveWith(y);
          }, (r) => {
            this.reject(r);
          });
        } catch (e) {
          this.reject(e);
        }
      } else {
        this.resolve(x);
      }
    } else {
      this.resolve(x);
    }
  }
}

export default Promise2;

/**
 * 浏览器模拟 Node 环境下的 process.nextTick （ 参考Vue.nextTick ）
 * @param fn
 */
function nextTick(fn) {
  if(process!==undefined && typeof process.nextTick === 'function'){
    return process.nextTick(fn)
  }else{
    let counter = 1;
    const observer = new MutationObserver(fn);
    let textNode = document.createTextNode(String(counter));

    observer.observe(textNode, {
      characterData: true
    });
    counter = counter + 1;
    textNode.data = String(counter);
  }
}
