class Promise2 {
  // 存储 then 调用的 第一个参数 和 第二个参数
  succeed = null;
  fail = null;

  // succeed 和 fail 的执行函数
  resolve(){
    setTimeout(() => {
      this.succeed();
    }, 0);
  };
  reject(){
    setTimeout(() => {
      this.fail();
    }, 0);
  };

  constructor(fn) {
    if (typeof fn !== 'function') {
      throw new Error('promise 需接受一个函数作为参数');
    }

    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  then(succeed, fail) {
    this.succeed = succeed;
    this.fail = fail;
  }
}

export default Promise2;
