const array = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7];
const array2 = array.reverse();

function countSort(arr) {
  let result = [];
  let { min, max } = findMinAndMax(arr); // 找到数中的最大最小值
  let countArr = new Array(max - min + 1).fill(0);
  // 构造 countArr 用于计数
  // 比如 arr = [2,3,4,5,6]
  // 构造 countArr = [0,0,0,0,0]
  for (let i = 0; i < arr.length; i++) {
    // 该循环统计每个数字出现的次数, 并放在对应的位置
    // 位置 index = 数字 - 最小值,
    // 比如 6 在 6 - 2 = 4 下标为 4 的位置上
    // index 与 值 的关系相差了一个最小值,
    // index 位置的数表示该值出现了多少次
    // 比如[-1,-6,3,4,3,3,8,7,8,6,5,]
    // 生成的 countArr 应该为
    // [1,0,0,0,0,1,0,0,0,3,1,1,1,1,2]
    const index = arr[i] - min;
    countArr[index] = countArr[index] + 1;
  }
  for (let i = 0; i < countArr.length; i++) {
    while (countArr[i] > 0) {
      result.push(i + min);
      countArr[i]--;
    }
  }
  return result;
}

function findMinAndMax(arr) {
  let max = arr[0];
  let min = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[0]) {
      min = arr[i];
    }
    if (arr[i] > arr[0]) {
      max = arr[i];
    }
  }
  return { min, max };
}

console.log(array2);
console.log(countSort(array2));

function countSort2(arr) {
  let { min, max } = findMinAndMax(arr);
  let result = [];
  let countArr = new Array(max - min + 1).fill(0);
  for (let i = 0; i < arr.length; i++) {
    let index = arr[i] - min;
    countArr[index] = countArr[index] + 1;
  }
  for (let i = 0; i < arr.length; i++) {
    while (countArr[i] > 0) {
      result.push(min + i);
      countArr[i]--;
    }
  }
  return result;
}

console.log(111, countSort2(array2));
