class Promise2 {
  // 存储 then 调用的 第一个参数 和 第二个参数
  state = 'pending';
  callbacks = [];

  // succeed 和 fail 的执行函数
  resolve(result) {
    setTimeout(() => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.callbacks.forEach(handle => {
        if (typeof handle[0] === 'function') {
          handle[0].call(undefined, result);
        }
      });
    }, 0);
  };

  reject(reason) {
    setTimeout(() => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.callbacks.forEach(handle => {
        if (typeof handle[1] === 'function') {
          handle[1].call(undefined, reason);
        }
      });
    }, 0);
  };

  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('promise 需接受一个函数作为参数');
    }

    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  then(succeed?, fail?) {
    const handle = [null, null];
    if (typeof succeed === 'function') {
      handle[0] = succeed;
    }
    if (typeof fail === 'function') {
      handle[1] = fail;
    }
    this.callbacks.push(handle);
  }
}

export default Promise2;
