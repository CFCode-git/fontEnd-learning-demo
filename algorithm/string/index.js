/*
翻转整数
123 >> 321
-123 >> -321
120 >> 21
range: [-2^31,2^31-1] 翻转后超出返回 0
 */

{
  // 字符串翻转
  const reverse = (x) => {
    // 非空判断
    if (typeof x !== 'number') {
      return
    }
    // 极值
    const max = Math.pow(2, 31) - 1
    const min = -1 * Math.pow(2, 31)
    // 识别数字部分并翻转
    const rest =
      x > 0 ?
        String(x).split('').reverse().join('') :
        String(x).slice(1).split('').reverse().join('')

    const result = x > 0 ? parseInt(rest, 10) : 0 - parseInt(rest, 10)
    if (result >= min && rest <= max) {
      return result
    }
    return 0
  }
  // O(1) O(1) 受边界值的字符串是一个常量的影响
}

{
  // 借鉴欧几里得求最大公约数的方法
  const reverse = (x) => {
    // 获取绝对值
    let int = Math.abs(x)
    // 极值
    const max = Math.pow(2, 31) - 1
    const min = -1 * Math.pow(2, 31)
    let num = 0
    while (int !== 0) {
      num = (num * 10) + (int % 10)
      int = Math.floor(int / 10)
    }
    // 处理异常值
    if (num < min && num > max) { return 0 }
    if (x < 0) { return num * -1 }
    return num
  }
  // 时间复杂度O(n) 空间复杂度O(1)
}

/*
有效的字母异位词
anagram, nagaram >> true
rat,cat >> false
 */

{
  // 排序后比较
  const isAnagram = (a, b) => {
    const aArr = a.split('')
    const bArr = b.split('')
    const sortFn = (a, b) => {
      return a.charCodeAt() - b.charCodeAt()
    }
    aArr.sort(sortFn)
    bArr.sort(sortFn)
    return aArr.join('') === bArr.join('')
  }
  // sort 原理：当数组长度小于等于10的时候使用插入排序；大于10的时候采用快排，快排平均时间复杂度为 O(nlogn)
  // 使用了两个数组存储分割后的字符串，与字符串长度线性相关，空间复杂度为 O(n)
}

{
  // 计数累加方法
  // 声明一个对象记录字符串每个字母的个数，另一个字符串每项与得到的对象做匹配
  const isAnagram = (a, b) => {
    if (a.length !== b.length) {
      return false
    }
    const hash = {}
    for (const key of a) {
      hash[key] = hash[key] || 0
      hash[key] += 1
    }
    for (const key of b) {
      if (!hash[key]) return false
      hash[key] -= 1
    }
    return true
  }
  // O(n) O(1)
}

/*
字符串转换成整数
"42 >> 42
"-42" >> -42
"4193 with words" >> 4183
"word and 999" >> 0
"-999999999999999999999999" >> -2147483648
原则：
超出范围返回边界值
当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。
假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。
 */

{
  // 正则
  const myAtoi = function (str) {
    // 提取需要的字符
    const result = str.trim().match(/^(-|\+)?\d+/g) // 表示第一位是 - 或者 + 或者都不是，后面匹配多个数字
    return result ?
      Math.max(Math.min(Number(result[0]), Math.pow(2, 31) - 1), -Math.pow(2, 31)) :
      0
  }
  // O(1) O(1)
}

{
  // 逐个判断
  const myAtoi = function (str) {
    const returnNum = function (num) {
      if (num >= -Math.pow(2, 31) && num <= (Math.pow(2, 31) - 1)) {
        return num
      } else {
        return num > 0 ? Math.pow(2, 31) - 1 : -Math.pow(2, 31)
      }
    }
    const news = str.trim() // 去除字符串中的空格
    if (parseInt(news)) { // 判断其中是否有数字
      return returnNum(parseInt(news))
    } else {
      return 0
    }
  }
  // O(1) O(1)
}

/*
报数
1 1
2 11
3 21
4 1211 -- 1个2 1个1
5 111221  -- 1个1 1个2 2个1
...
 */

{
  // 递归
  // 想要获取第n项的结果，要先获取第n-1项的结果，然后说出第n-1项的结果作为第n项的结果
  const countAndSay = function (n) {
    if (n === 1) {
      return '1'
    }
    const preResult = countAndSay(n - 1) // 得到第n项的结果
    // 返回结果 -- 将上一项的结果描述一下 ： 几个2 几个1
    return preResult.replace(/(\d)\1*/g, item => `${item.length}${item[0]}`)
    /*
    正则：
     \d　匹配数字
     \1 匹配前面第一个括号内匹配到的内容
     (\d)\1* 匹配连续相同的数字
     replace 将匹配到的内容处理为 ： 长度 + 内容
     */
  }
  // O(n) -- 递归调用 n 次
  // O(n) -- 每次调用声明的变量数固定，和 n 为线性关系。
}

{
  // 循环
  const countAndSay = function (n) {
    let result = '1' // 第一个数 是 1
    for (let i = 0; i < n; i++) {
      result = result.replace(/(\d)\1*/g, item => `${item.length}${item[0]}`)
    }
    return result
  }
  // O(n) -- 循环了 n 次
  // O(1) -- 只有一个 result 变量
}

/*
反转字符串，要求不给数组分配额外的空间，原地修改数组，使用 O(1) 额外空间解决问题。
['h','e','l','l','o'] ==> ['o','l','l','e','h']
 */
{
  // 首尾替换
  function reverseArray(array) {
    for (let i = 0; i < array.length / 2; i++) {
      [array[i], array[array.length - 1 - i]] = [array[array.length - 1 - i], array[i]]
    }
    return array
  }

  function reverseArray2(array) {
    for (let i = 0; i < array.length / 2; i++) {
      const temp = array[i]
      array[i] = array[array.length - 1 - i]
      array[array.length - 1 - i] = temp
    }
    return array
  }

  // O(n)
  // O(1)
}

/*
找到字符串中的第一个唯一字符
leetcode >> 0
loveleetcode >> 2
*/
{
  // 遍历字符串，某个字符从头开始找的索引和从尾开始找的索引如果相等
  // canal >> lastIndexOf >> 3
  // 判断字符串的 indexOf() 和 lastIndexOf()
  const firstUniqueCahr = function(str){
    for(let i=0;i<str.length;i++){
      if(str.indexOf(str[i]) === str.lastIndexOf(str[i])){
        return i
      }
    }
    return -1
  }
  // O(n^2) -- indexOf 遍历 n 次，外部循环 n 次
  // O(1) -- 临时变量 i
}

{
  // 通过 hash 表
  const firstUniqueCahr = function(str){
    const hash ={}
    for(let i=0;i<str.length;i++){
      if (!hash[str[i]]) {
        hash[i] = 1
      }else{
        hash[str[i]] += 1
      }
    }
    for(let i=0;i<str.length;i++){
      if(hash[str[i]]===1){
        return i
      }
    }
    return -1
  }
  // O(n) -- 一层遍历
  // O(1) -- 变量只有hash和i，不随输入变量的变化而变化。
}





