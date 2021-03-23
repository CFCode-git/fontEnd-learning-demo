import * as chai from 'chai';

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
    let called = false;
    const promise = new Promise(() => {
      called = true;
    });
    // @ts-ignore
    assert(called === true);
  });
  it('new Promise(fn) 中的 fn 接受 resolve 和 reject 两个函数', () => {
    let called = false;
    const promise = new Promise((resolve, reject) => {
      called = true;
      assert.isFunction(resolve);
      assert.isFunction(reject);
    });
    // @ts-ignore
    assert(called === true);
  });
  it('promise.then(success) 中的 success 会在 resolve 被调用的时候执行', (done) => {
    let called = false;
    const promise = new Promise((resolve, reject) => {
      // 该函数 没有执行
      assert.isFalse(called);
      resolve();
      // 函数已执行
      setTimeout(() => {
        assert.isTrue(called);
        done()
      });
    });
    promise.then(() => {
      called = true;
    },null);
  });
  it('should .', () => {

  });
});
