class Promise2 {
  // 存储 then 调用的 第一个参数 和 第二个参数
  state = 'pending';
  callbacks = [];

  private resolveOrReject(state,data,i){
    nextTick(() => {
      if (this.state !== 'pending') return;
      this.state = state
      this.callbacks.forEach(handle => {
        if (typeof handle[i] === 'function') {
          let x;
          try { // 有可能报错，报错的话将错误传给 返回的新 promise 给 reject 掉
            x = handle[i].call(undefined,data);
          } catch (e) {
            return handle[2].reject(e);
          }
          handle[2].resolveWith(x);
        }
      });
    });
  }

  // succeed 和 fail 的执行函数
  resolve(result) {
    this.resolveOrReject('fulfilled',result,0)
  };

  reject(reason) {
    this.resolveOrReject('rejected',reason,1)
  };

  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('promise 需接受一个函数作为参数');
    }

    fn((result)=>this.resolve(result), (reason)=>this.reject(reason));
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

  resolveWithSelf(){
    this.reject(new TypeError());
  }
  resolveWithPromise(x){
    x.then((result) => {
      this.resolve(result);
    }, (reason) => {
      this.reject(reason);
    });
  }
  private getThen(x){
    let then;
    try {
      then = x.then;
    } catch (e) {
      return this.reject(e);
    }
    return then
  }
  resolveWithThenable(x){
    try {
      x.then((y) => {
        this.resolveWith(y);
      }, (r) => {
        this.reject(r);
      });
    } catch (e) {
      this.reject(e);
    }
  }
  resolveWithObject(x){
    let then = this.getThen(x)
    if (then instanceof Function) {
      this.resolveWithThenable(x)
    } else {
      this.resolve(x);
    }

  }

  resolveWith(x) {
    if (this === x) {
      this.resolveWithSelf()
    } else if (x instanceof Promise2) {
      this.resolveWithPromise(x)
    } else if (x instanceof Object) {
      this.resolveWithObject(x)
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
