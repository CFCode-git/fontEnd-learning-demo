// // 事件委托
// function delegate(element, eventType, selector, fn) {
//   element.addEventListener(eventType, e => {
//     let el = e.target
//     while (!el.matches(selector)) {
//       if (element === el) {
//         el = null
//         break
//       }
//       el = el.parentNode
//     }
//     el && fn.call(el, e, el)
//   })
//   return element
// }

// 两数之和
{
  const array = [2, 7, 11, 5]
  const target = 16
  var twoSum = function (nums, target) {
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
      let index = map.get(target - nums[i])
      if (index !== undefined) return [index, i]
      map.set(nums[i], i)
    }
    return []
  }
  console.log(twoSum(array, target));
}

// 整数取反
{
  // const x = -123
  const x = 1534236469
  let reverse = function (x) {
    let array = []
    let temp = x <= 0 ? -x : x
    let result = 0
    while (temp > 0) {
      array.push(temp % 10)
      temp = ~~(temp / 10)
    }
    for (let i = 0; i < array.length; i++) {
      result = result * 10 + array[i]
    }
    result = x <= 0 ? -result : result
    return result >= -2147483648 && result <= 2147483647 ?
      result :
      0
  }
  console.log(reverse(x))
}

// 回文数
{
  let x = 101
  function isPalindrome(x){
    const y = x.toString().split('').reverse().join('')
    console.log(y)
    return  y === x.toString()
  }
  console.log(isPalindrome(x))
}




/*
* 思路：我靠我感觉这个是 弄一个 线程 里面一直是 有三个 Promise 请求 url， 但是不是等 Promise.all 结束，而是只要里面一个搞定了马上push下一个进去
* 队列 并发控制
* */



