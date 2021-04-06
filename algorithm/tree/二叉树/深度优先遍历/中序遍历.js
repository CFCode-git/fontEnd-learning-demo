/** 树的遍历
 *        1
 *     2    3
 *   4        5
 *     6
 *   7   8
 *
 * 中序遍历: 遍历左子树，访问根，遍历右子树
 * 先考察到一个节点后，将其暂存，遍历完左子树后，再输出该节点的值，然后遍历右子树（左根右）
 * 47682135
 */

const data = require('../treeData')
// 递归
{
  const array = []
  function inOrder(node){
    if(node){
      inOrder(node.left)
      array.push(node.value)
      // console.log(node.value)
      inOrder(node.right)
    }
  }
  inOrder(data)
  console.log(1,array)
}

// 非递归
// 先把左节点推入栈，然后取出，
// 再把右节点推入栈，取出。
{
  const array = []
  function inOrderUnRecur(node){
    if(!node){
      throw new Error('Empty Tree!')
    }
    const stack =[]
    while(stack.length!==0 || node){
      if(node){
        stack.push(node)
        node = node.left
      }else{
        node = stack.pop()
        // console.log(node.value)
        array.push(node.value)
        node = node.right
      }
    }
  }
  inOrderUnRecur(data)
  console.log(2,array)
}


