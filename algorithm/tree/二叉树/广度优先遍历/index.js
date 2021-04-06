// 借助 队列
const data = require('../treeData')


{
  const result = []
  function fn(node) {
    if (!node) {
      throw new Error('Empty Tree')
    }
    let queue = []
    queue.push(node)
    while (queue.length !== 0) {
      node = queue.shift()
      // console.log(node.value)
      result.push(node.value)
      if(node.left) queue.push(node.left)
      if(node.right) queue.push(node.right)
    }
  }
  fn(data)
  console.log(1,result)
}

