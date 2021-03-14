const array = [-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7]
const array2 = array.reverse()

function bubbleSort(arr){

  for(let j=1;j<arr.length;j++){ 
    // 长度为 n 的数组, 一共要比较 n-1 次
    // 循环的 第一次 j=1, 
    // 相应的 i 要从下标为 0 遍历到下标为 n-2 (下标n-2和下标n-1比)
    // 循环的最后一次 j=arr.length-1,
    // i只需 0 和 1 比
    for(let i=0;i<arr.length-j;i++){ 
      // 这个循环负责移动指针 让 第 n 项和第 n+1 项比
      if(arr[i]>arr[i+1]){
        let temp = arr[i]
        arr[i] = arr[i+1]
        arr[i+1] = temp
      }
    }
  }
  return arr
}
// console.log(bubbleSort(array))
console.log(array2)
console.log(bubbleSort(array2))