class EventHub {
  private cache = {};
  // {
  //  eventName:[fn1,fn2,fn3.....],
  //  eventName2:[fn1,fn2,fn3...]
  // }

  // 把 fn 推进 this.cache[eventName] 数组
  on(eventName, fn) {
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }
  // 把 this.cache[eventName] 里面的 fn 依次调用
  emit(eventName, data?) {
    let array = this.cache[eventName] || [];
    array.forEach((fn) => fn(data));
  }
  // 把 fn 从 数组 中移除
  off(eventName, fn) {
    let index = indexOf(this.cache[eventName], fn);
    if (index === -1) return;
    this.cache[eventName].splice(index, 1);
  }
}

export default EventHub;

function indexOf(array, item) {
  if (array === undefined) return -1;
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      index = i;
      break;
    }
  }
  return index;
}
