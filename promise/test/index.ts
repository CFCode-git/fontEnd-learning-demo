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
      reject()
      // 函数已执行
      setTimeout(() => {
        assert.isTrue(fail.called);
        done()
      });
    });
    promise.then(null,fail);
  });
});
