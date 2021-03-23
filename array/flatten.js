const arr = [1, 2, 3, [4, 5, 6, [7, 8, 9, [1, 1, 1, 1]]]];
const arr2 = [
  1,
  2,
  { name: "hi" },
  [4, 5, 6, [7, { name: "hello" }, 9, [1, 1, 1, 1]]],
];

// 不带深度 // 递归调用自己
function flatten(array) {
  return array.reduce((a, b) => {
    return a.concat(Array.isArray(b) ? flatten(b) : b);
  }, []);
}

console.log(flatten(arr2));

// 带深度 // 递归调用自己, 每次深度 -1
function flattenDeep(array, deep = 1) {
  return deep > 0
    ? array.reduce((a, b) => {
        return a.concat(Array.isArray(b) ? flattenDeep(b, deep - 1) : b);
      }, [])
    : array.slice();
}

console.log(flattenDeep(arr2, 2));

// 递归变循环

function flatten2(input) {
  // console.log(input.length);
  const stack = [...input];
  // console.log(stack.length);
  const result = [];
  while (stack.length) {
    // console.log("------", stack.length);
    const next = stack.pop(); // 弹栈
    if (Array.isArray(next)) {
      stack.push(...next); // 解构后入栈
    } else {
      result.push(next);
    }
  }
  return result.reverse();
}

console.log(flatten2(arr2));
