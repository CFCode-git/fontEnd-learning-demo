/**
 * 树的遍历
 *        1
 *     2    3
 *   4        5
 *     6
 *   7   8
 *
 * 先序遍历: 访问根，遍历左子树，遍历右子树
 * 先考察到一个节点后，即刻输出该节点，并继续遍历其左右子树（根左右）
 * 124678
 */

const data = require('../treeData')

// 递归
{
  const array = []
  function preOrder(node) {
    if(node){
      // console.log(node.value)
      array.push(node.value)
      preOrder(node.left)
      preOrder(node.right)
    }
  }
  preOrder(data)
  console.log(1,array)
}


// 非递归 使用 栈 的思想
{
  const array = []
  function preOrderUnRecur(node){
    if(!node){ throw new Error('Empty Tree') }
    let stack = []
    stack.push(node)
    while(stack.length!==0){
      node = stack.pop()
      // console.log(node.value)
      array.push(node.value)
      if(node.right) stack.push(node.right)
      if(node.left) stack.push(node.left)
    }
  }
  preOrderUnRecur(data)
  console.log(2,array)
}
