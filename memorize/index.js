function memorize(a, b) {
  const map = new Map();
  memorize = (a, b) => {
    console.log("come from cache");
    const aCache = map.get(a) || map.get(map.set(a, a.toString()));
    const bCache = map.get(b) || map.get(map.set(b, b.toString()));
    return aCache + bCache;
  };
  map.set(a, a.toString());
  map.set(b, b.toString());
  return a.toString() + b.toString();
}

const a = memorize(1, 2);
const b = memorize(1, 2);
const c = memorize(1, 2);
const d = memorize(3, 4);
const e = memorize(4, 3);
console.log(a, b, c, d, e);

function memorize2(a, b) {
  if (!memorize2.cache) {
    memorize2.cache = new Map();
  }
  const map = memorize2.cache;
  const aCache = map.get(a) || map.get(map.set(a, a.toString()));
  const bCache = map.get(b) || map.get(map.set(b, b.toString()));

  return aCache + bCache;
}

// var cache = new Map();
// function memorizeFn() {
//   let key = [];
//   const cache = new Map();
//   let result;
//   return function fn(a, b) {
//     if (key[0] === a || key[1] === b) {
//       console.log("用缓存");
//       result = cache.get(key);
//     } else {
//       console.log("计算了");
//       key = [a, b];
//       result = a.toString() + b.toString();
//       cache.set(key, result);
//     }
//     return result;
//   };
// }
// var memorize = memorizeFn();
// var a = memorize(1, 2);
// var b = memorize(1, 2);
// var c = memorize(3, 4);
// var d = memorize(3, 4);
// console.log(a, b, c, d);
