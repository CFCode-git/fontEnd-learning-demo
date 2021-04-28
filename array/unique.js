const array = [
  1,
  1,
  "true",
  "true",
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  "NaN",
  0,
  0,
  "a",
  "a",
  {},
  {},
];

function unique1(arr) {
  return Array.from(new Set(arr));
}
// console.log(unique1(array)); // 无法去除空对象

function unique2(array) {
  const hash = {};
  for (let value of array) {
    if (!hash[value]) {
      hash[value] = 1;
    } else {
      hash[value] += 1;
    }
  }
  return Object.keys(hash);
}

// console.log(unique2(array));

function unique3(arr) {
  let obj = {};
  let a = arr.filter((item, index, arr) => {
    if (obj.hasOwnProperty(typeof item + item)) {
      return false;
    } else {
      obj[typeof item + item] = true;
      // console.log(item, obj, "return true");
      // return obj; // 相当于 true？
      return true;
    }
  });
  return a;
  // 最终 a 会是返回 true 的 item 构成的数组
}

console.log(unique3(array));
