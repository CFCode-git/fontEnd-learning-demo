/**
 * 树的遍历
 *        1
 *     2    3
 *   4        5
 *     6
 *   7   8
 *
 * 后序遍历: 遍历左子树，遍历右子树，访问根。
 * 先考察到一个节点后，将其暂存，遍历完左右子树之后，再输出该节点的值（左右根）
 * 78642531
 */

const data = require('../treeData')

// 递归
{
 const array = []

 function postOrder(node) {
  if (node) {
   postOrder(node.left)
   postOrder(node.right)
   array.push(node.value)
  }
 }

 postOrder(data)
 console.log(1, array)
}


// 非递归 使用一个栈
// 先吧根节点和左子树推入栈，然后取出左树
// 再推入右子树，取出，最后取出根节点
// 临时变量 tmp 记录入栈、出栈的节点
//
// 画图理解:
// stack 【】
// tmp
// node
// array
{
 const array = []

 function postOrderUnRecur(node) {
  if (!node) {
   throw new Error('Empty Tree')
  }
  const stack = []
  stack.push(node)
  let tmp = null
  while (stack.length !== 0) {
   tmp = stack[stack.length - 1]
   if (tmp.left && node !== tmp.left && node !== tmp.right) {
    stack.push(tmp.left)
   } else if (tmp.right && node !== tmp.right) {
    stack.push(tmp.right)
   } else {
    array.push(stack.pop().value)
    // console.log(stack.pop().value)
    node = tmp
   }
  }
 }

 postOrderUnRecur(data)
 console.log(2, array)
}


// 非递归：使用两个栈
{
 const array = []

 function postOrderUnRecur(node) {
  if (node) {
   let s1 = [] // tmp
   let s2 = []
   s1.push(node)
   while (s1.length !== 0) {
    node = s1.pop()
    s2.push(node)
    if (node.left) {
     s1.push(node.left)
    }
    if (node.right) {
     s1.push(node.right)
    }
   }
   while (s2.length !== 0) {
    array.push(s2.pop().value)
    // console.log(s2.pop().value)
   }
  }
 }
 postOrderUnRecur(data)
 console.log(3, array)
}
