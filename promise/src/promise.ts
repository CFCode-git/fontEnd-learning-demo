class Promise2 {
  // 存储 then 调用的 第一个参数 和 第二个参数
  succeed = null;
  fail = null;
  state = 'pending';

  // succeed 和 fail 的执行函数
  resolve(result) {
    setTimeout(() => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      if (typeof this.succeed === 'function') {
        this.succeed.call(undefined,result);
      }
    }, 0);
  };

  reject(reason) {
    setTimeout(() => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      if (typeof this.fail === 'function') {
        this.fail.call(undefined,reason);
      }
    }, 0);
  };

  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('promise 需接受一个函数作为参数');
    }

    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  then(succeed?, fail?) {
    if (typeof succeed === 'function') {
      this.succeed = succeed;
    }
    if (typeof fail === 'function') {
      this.fail = fail;
    }
  }
}

export default Promise2;
