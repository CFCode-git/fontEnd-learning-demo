const array = [-7,-6,-5,-4,-3,-2,-1,0,0,1,1,2,3,4,5,6,7]
const array2 = array.reverse()

function insertSort(arr){
  // 从下标为 1 开始遍历, 假设arr[0]已经排好序 
  for(let i=1;i<arr.length;i++){ 
    let count = i  
    // count 是指针, 
    // 下标为 count 的项和前面排好序的逐个对比, 
    // 只要符合条件就交换位置
    while(count>0){
      if(arr[count] < arr[count-1]){
        let temp =  arr[count-1]
        arr[count-1] = arr[count]
        arr[count] = temp
      }
      count--
    }
  }
  return arr
}

console.log(array2)
console.log(insertSort(array2))