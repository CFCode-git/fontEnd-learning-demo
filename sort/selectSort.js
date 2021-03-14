const array = [-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7]
const array2 = array.reverse()

function selectSort(arr){
  for(let i=0;i<arr.length;i++){
    // 长度为n的数组, 下标从 0 遍历到 n-1
    for(let j=i+1;j<arr.length;j++){
      // 每次都从i+1开始取值与第i项比较,
      //  如果符合条件就交换两者的值
      // **当i是n-1时, j为n, 等于arr.length, 结束**
      if(arr[i]>arr[j]){
        let temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp
      }
    }
  }
  return arr
}
console.log(array2)
console.log(selectSort(array2))
