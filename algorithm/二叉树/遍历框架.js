// 递归遍历框架
function traverse(root){
  if(root===null)return
  // 前序位置
  traverse(root.left)
  // 中序位置
  traverse(root.right)
  // 后序位置
}

// 迭代遍历框架 -- 层序遍历(逐层遍历)
// while循环对应从上到下的遍历，for循环对应从左到右的遍历
function levelTraverse(root) {
  if(root===null) return 
  let q = []
  q.push(root)
  while(q.length!==0){
    let length = q.length
    for(let i=0;i<length;i++){ // 如果不需要纪录层数，此层循环可以移除
      let currentNode = q.pop()
      if(currentNode.left!==null)q.push(currentNode.left)
      if(currentNode.right!==null)q.push(currentNode.right)
    }
  }
}
