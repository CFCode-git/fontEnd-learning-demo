const array = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7];
const array2 = array.reverse();

function quickSort(arr){
  if(arr.length<=1){
    return arr
  }
  const pivotIndex = Math.floor(arr.length/2)
  const pivotNum = arr.splice(pivotIndex,1)[0]
  const left = []
  const right = []
  for(let i=0;i<arr.length;i++){
    if(arr[i]<pivotNum){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pivotNum],quickSort(right))
}

console.log(array2);
console.log(quickSort(array2));
