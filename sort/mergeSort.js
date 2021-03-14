const array = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7];
const array2 = array.reverse();

function mergeSort(arr) {
  const length = arr.length;
  if (length < 2) return arr;
  const middleIndex = Math.floor(length / 2);
  const left = arr.slice(0, middleIndex);
  const right = arr.slice(middleIndex);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  if (left.length === 0) return right;
  if (right.length === 0) return left;
  return left[0] <= right[0]
    ? [left[0]].concat(merge(left.slice(1, left.length), right))
    : [right[0]].concat(merge(left, right.slice(1, right.length)));
}

console.log(array2);
console.log(mergeSort(array2));
