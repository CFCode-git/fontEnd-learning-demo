class TreeNode{
  constructor(val,left=null,right=null){
    this.val = val
    this.left = left 
    this.right = right 
  }
}

TreeNode.prototype.toString = function(){
  let result = []
  levelTraverse(this, function (root, left, right) {
    result.push({
      val: root.val,
      left: left ? left.val : null,
      right: right ? right.val : null
    })
  })
  return JSON.stringify(result, null, 2)
}

function createTree(array) {
  if (array == null || array.length == 0 || array[0] == null) {
      return null;
  }

  let index = 0;
  let length = array.length;
  let root = new TreeNode(array[0]);
  let nodeQueue = []
  nodeQueue.push(root);
  let currNode;
  while (index < length) {
      index++;
      if (index >= length) {
          return root;
      }
      currNode = nodeQueue.shift();
      let leftChild = array[index];
      if (leftChild != null) {
          currNode.left = new TreeNode(leftChild);
          nodeQueue.push(currNode.left);
      }
      index++;
      if (index >= length) {
          return root;
      }
      let rightChild = array[index];
      if (rightChild != null) {
          currNode.right = new TreeNode(rightChild);
          nodeQueue.push(currNode.right);
      }
  }

  return root;
}

let arr =  [1,2,null,null,3,4]
let tree = createTree(arr)
console.log(tree.toString())
console.log(JSON.stringify(tree,(key,value)=>{
  if(value===null)return 'laji'
  return value
},2))

// helper
// 迭代遍历框架 -- 层序遍历(逐层遍历)
// while循环对应从上到下的遍历，for循环对应从左到右的遍历
function levelTraverse(root, fn) {
  if(root===null) return 
  let q = []
  q.push(root)
  while(q.length!==0){
    let length = q.length
    for(let i=0;i<length;i++){ // 如果不需要纪录层数，此层循环可以移除
      let currentNode = q.pop()
      if(currentNode.left!==null)q.push(currentNode.left)
      if(currentNode.right!==null)q.push(currentNode.right)
      fn(currentNode, currentNode.left, currentNode.right)
    }
  }
}
