import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

chai.use(sinonChai);

const assert = chai.assert;
import Promise from '../src/promise';

describe('Promise', () => {
  it('是一个类', () => {
    assert.isFunction(Promise);
    assert.isObject(Promise.prototype);
  });
  it('new Promise() 必须接受一个函数', () => {
    assert.throw(() => {
      // @ts-ignore
      new Promise();
    });
    assert.throw(() => {
      // @ts-ignore
      new Promise(1);
    });
    assert.throw(() => {
      // @ts-ignore
      new Promise(false);
    });
  });
  it('new Promise(fn) 会生成一个对象，该对象有 then 方法。', () => {
    const promise = new Promise(() => {});
    assert.isFunction(promise.then);
  });
  it('new Promise(fn) 中的 fn 立即执行', () => {
    let fn = sinon.fake();
    const promise = new Promise(fn);
    // @ts-ignore
    assert(fn.called);
  });
  it('new Promise(fn) 中的 fn 接受 resolve 和 reject 两个函数', (done) => {
    new Promise((resolve, reject) => {
      assert.isFunction(resolve);
      assert.isFunction(reject);
      done() // done 为了保证上面的两个断言执行
    });
  });
  it('promise.then(success,null) 中的 success 会在 resolve 被调用的时候执行', (done) => {
    let success = sinon.fake();
    const promise = new Promise((resolve, reject) => {
      // 该函数 没有执行
      assert.isFalse(success.called);
      resolve();
      // 函数已执行
      setTimeout(() => {
        assert.isTrue(success.called);
        done()
      });
    });
    promise.then(success,null);
  });
  it('promise.then(null,fail) 中的 fail 会在 reject 被调用的时候执行', (done) => {
    let fail = sinon.fake();
    const promise = new Promise((resolve, reject) => {
      // 该函数 没有执行
      assert.isFalse(fail.called);
      reject();
      // 函数已执行
      setTimeout(() => {
        assert.isTrue(fail.called);
        done();
      });
    });
    promise.then(null, fail);
  });
  it('2.2.1 then 后面的不是函数，必须忽略', () => {
    const promise = new Promise((resolve) => {
      resolve();
    });
    promise.then(false, null);
    assert.isTrue(1 === 1);
  });
  it('2.2.2 success 必须在 Promise resolve 的时候调用，同时把 resolve 的 value 传给 success，resolve 不能被调用两次',
    (done) => {
      const succeed = sinon.fake();
      const promise = new Promise((resolve) => {
        assert.isFalse(succeed.called);
        resolve(233);
        resolve(445);
        setTimeout(() => {
          assert(promise.state === 'fulfilled');
          assert.isTrue(succeed.calledOnce); // 只被调用一次
          assert(succeed.calledWith(233)); // 调用的参数来自 第一遍 resolve
          done();
        }, 0);
      });
      assert(promise.state === 'pending');
      promise.then(succeed);
    });
  it('2.2.3 fail 必须在 Promise reject 的时候调用，同时把 reject 的 reason 传给 fail, 不能被调用两次',
    (done) => {
      const fail = sinon.fake();
      const promise = new Promise((resolve, reject) => {
        assert.isFalse(fail.called);
        reject(233);
        reject(445);
        setTimeout(() => {
          assert(promise.state === 'rejected');
          assert.isTrue(fail.calledOnce); // 只被调用一次
          assert(fail.calledWith(233)); // 调用的参数来自 第一遍 resolve
          done();
        }, 0);
      });
      assert(promise.state === 'pending');
      promise.then(null, fail);
    });
  it('2.2.4-1 在当前同步代码执行完毕之前，不能调用 succeed', (done) => {
    const succeed = sinon.fake();
    const promise = new Promise((resolve) => {
      resolve();
    });
    promise.then(succeed);
    assert.isFalse(succeed.called);
    setTimeout(() => {
      assert.isTrue(succeed.called);
      done();
    }, 0);
  });
  it('2.2.4-2 在当前同步代码执行完毕之前，不能调用 fail', (done) => {
    const fail = sinon.fake();
    const promise = new Promise((resolve, reject) => {
      reject();
    });
    promise.then(null, fail);
    assert.isFalse(fail.called);
    setTimeout(() => {
      assert.isTrue(fail.called);
      done();
    }, 0);
  });
  it('2.2.5-1 success 在调用的时候不得带入 promise 实例的 this.', (done) => {
    const promise = new Promise((resolve) => {
      resolve();
    });
    promise.then(function () {
      'use strict';
      assert(this === undefined);
      done();
    });
  });
  it('2.2.5-2 fail 在调用的时候不得带入 promise 实例的 this.', (done) => {
    const promise = new Promise((resolve, reject) => {
      reject();
    });
    promise.then(null, function () {
      'use strict';
      assert(this === undefined);
      done();
    });
  });
  it('2.2.6-1 then 的 succeed 可以在同一个 Promise 里面被多次调用，且必须按顺序调用 .', (done) => {
    const promise = new Promise((resolve) => {
      resolve();
    });
    const callbacks = [
      sinon.fake(),
      sinon.fake(),
      sinon.fake()
    ];
    promise.then(callbacks[0]);
    promise.then(callbacks[1]);
    promise.then(callbacks[2]);
    setTimeout(() => {
      assert(callbacks[0].called);
      assert(callbacks[1].called);
      assert(callbacks[1].calledAfter(callbacks[0]));
      assert(callbacks[2].called);
      assert(callbacks[2].calledAfter(callbacks[1]));
      done();
    }, 0);
  });
  it('2.2.6-2 then 的 fail 可以在同一个 Promise 里面被多次调用，且必须按顺序调用 .', (done) => {
    const promise = new Promise((resolve,reject) => {
      reject();
    });
    const callbacks = [
      sinon.fake(),
      sinon.fake(),
      sinon.fake()
    ];
    promise.then(null,callbacks[0]);
    promise.then(null, callbacks[1]);
    promise.then(null, callbacks[2]);
    setTimeout(() => {
      assert(callbacks[0].called);
      assert(callbacks[1].called);
      assert(callbacks[1].calledAfter(callbacks[0]));
      assert(callbacks[2].called);
      assert(callbacks[2].calledAfter(callbacks[1]));
      done();
    }, 0);
  });
  it('2.2.7 then 必须返回一个 promise .', () => {
    const promise = new Promise((resolve) => {
      resolve();
    });
    const promise2 = promise.then(() => {}, () => {});
    assert(promise2 instanceof Promise);
  });
  it('2.2.7.1[>>2.3.3]-1 如果 then(succeed,fail) 中的 succeed 返回一个值x (x是一个普通字符串)，运行 [[Resolve]](promise2,x) .', (done) => {
    const promise1 = new Promise((resolve) => {
      resolve();
    });
    promise1
      .then(() => '成功', () => {})
      .then(result => {
        assert.equal(result, '成功');
        done();
      });
  });
  it('2.2.7.1[>>2.3.3]-2 如果 then(succeed,fail) 中的 succeed 返回一个值x (x是一个Promise实例)，运行 [[Resolve]](promise2,x) .', (done) => {
    const promise1 = new Promise((resolve) => {
      resolve();
    });
    const fn = sinon.fake();
    const promise2 = promise1
      .then(() => new Promise((resolve) => resolve()), () => {});
    promise2.then(fn);
    setTimeout(()=>{
      assert(fn.called);
      done()
    })
  });
});
