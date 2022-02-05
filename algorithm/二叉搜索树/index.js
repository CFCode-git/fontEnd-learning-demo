// BST
//  1. 每一个节点node，左子树的节点都比node小，右子树的节点都比node大。
//  2. 每一个节点node的左右子树都是BST。
//  3. BST的中序遍历结果是有序的。


// BST第k小的元素 leetcode 230
let tree = {
  val:5,
  left:{
    val:3,
    left:{
      val:2,
      left:{
        val:1,
        left:null,
        right:null
      },
      right:null
    },
    right:{
      val:4,
      left:null,
      right:null
    }
  },
  right:{
    val:6,
    left:null,
    right:null
  },
}
let rank=0 
let res
const kthSmallest = function(root,k){
  traverse(root,k)
  return res
}
const traverse = function(root,k){
  if(root===null)return null

  traverse(root.left,k)

  // 中序遍历位置
  rank++
  if(rank === k){
    res = root.val
    return
  }

  traverse(root.right,k)
}
// 二叉搜索树转化累加树 leetcode 538 // BST转累加树 leetcode 1038
var convertBST = function(root) {
  let sum = 0
  const traverse = function(root){
    if(root === null) return
    // 降序遍历
    traverse(root.right)
    // 中序遍历位置
    sum = sum + root.val
    root.val = sum
    traverse(root.left)
    return root
  }
    traverse(root)
    return root
};


// 判断BST的合法性  leetcode 98
// https://labuladong.gitee.io/algo/2/18/26/
function isValidBST(root){
  return judge(root,null,null)
}
function judge(root,min,max){
  // base case
  if(root === null)return true
  /* 对于右子树来说，根节点最小。min 非空，判断右子树*/
  if(min!==null && root.val<=min.val)return false
  /* 对于左子树来说，根节点最大。max 非空，判断左子树*/
  if(max!==null && root.val>=max.val)return false 
  return judge(root.left,min,root) && judge(root.right,root,max)
}


// 在BST中搜索元素 leetcode 700
const searchBST = function(root, val) {
  if(root===null) return null
  if(root.val === val){
    return root
  }
  if(root.val>val){
   return searchBST(root.left,val) 
  }
  if(root.val<val){
   return searchBST(root.right,val) 
  }
};

// 往BST插入一个数和删除一个数，本质都是先找，后改
// 在BST中插入一个数 (BST一般不会插入已经存在的元素) leetcode701
const insertIntoBST(root,val){
  // 找到空位置插入
  if(root.val === null) 
    return new TreeNode(val) // 最终插入的值会赋值给上一个root.left或者root.right
  if(root.val < val)
    root.right = insertIntoBST(root.right,val)
  if(root.val > val)
    root.left = insertIntoBST(root.left,val)
  // 返回插入后的结果
  return root
}

// 在BST中删除一个数 leetcode 450
const deleteNode(root,val){
  if(root === null)return null
  if(root.val === val){
    // 找到，删除
    // 如果root的左子树为空，直接返回右子树顶替自己的位置即可；右子树为空亦然。
    // 同时兼容两个子树为空的情况下，直接返回null给自己的父节点
    if(root.left === null) return root.right
    if(root.right === null) return root.left
    if(root.left!==null&&root.right!==null){
      // 如果左右子树都不为空，为了不破坏BST的性质，当前节点要找到右子树的最小值顶替自己
      // 或者找到左子树中的最大值顶替自己
      // 下面找右子树的最小节点
      let minNode = getMinNode(root.right)
      // 删除右子树的最小节点,deleteNode返回删除节点后的子树
      root.right = deleteNode(root.right,minNode.val)
      // 用右子树的最小节点替换root节点
      minNode.left = root.left 
      minNode.right = root.right
      root = minNode
    }
  }else if(root.val>val){
    // 当前节点比要删除的节点大，往左边找
    root.left = deleteNode(root.left,val)
  }else{
    // 当前节点比要删除的节点小，往右边找
    root.right = deleteNode(root.right,val)
  }
  return root
}

const getMinNode(root){
 // 右子树的最左侧的值就是最小值
  while(root.left){
    root = root.left
  }
  return root
}

// 不同的二叉搜索树 leetcode 96
// 给出一个整数n，返回 [1,n]能够构成多少棵不同的BST
// 当n=5,取3为节点的时候，我们需要知道左子树[1,2]和右子树[4,5]可以构成多少棵BST
const numTrees = function(n){
  const count = function(start,end){
    if(start>end)return 1 // 当start>end的时候，表示null节点，这也属于一种情况
    
    // i<=end,当i=end,i++的时候，会进入null节点的情况
    let res = 0
    for(let i=start;i<=end;i++){
      let leftCount = count(start,i-1)
      let rightCount = count(i+1,end)
      res = res + leftCount * rightCount
    }
    return res
  }
  return count(1,n)
} 
// 细看上面的方案，会发现存在子问题重复的情况，比方说
// 当要count[1,5]的数目时，当节点为3时，需要count左子树[1,2]的情况
// 当节点为4时，需要count左子树[1,3]的时候，其中也包含了count[1,2]
// 子问题重复很容易导致调用栈溢出，因此我们可以做一个优化。
const numTrees = function(n){
  const createNote = function(n){
    const arr = []
    for(let i=0;i<n+1;i++){
      arr[i] = new Array(n+1).fill(0)
    }
    return arr
  }
  let note = createNote(n)
  const count = function(start,end){
    if(start>end)return 1 // 当start>end的时候，表示null节点，这也属于一种情况
    if(note[start][end]!==0){
      return note[start][end]
    } 
    // i<=end,当i=end,i++的时候，会进入null节点的情况
    let res = 0
    for(let i=start;i<=end;i++){
      let leftCount = count(start,i-1)
      let rightCount = count(i+1,end)
      res = res + leftCount * rightCount
    }
    note[start][end]=res
    return res
  }
  return count(1,n)
} 


// 不同的二叉搜索树 leetcode 95
// 给出一个整数n，返回[1,n]能构建的所有合法BST列表
// 思路：
//    1. 穷举root所有可能
//    2. 递归构造左右子树的所有合法BST
//    3. 给root节点穷举所有左右子树组合
const generateTrees(n){
  if(n===0) return [] // n为零返回空数组
  return buildAllTree(1,n)
}
const buildAllTrees = (start,end) => {
  let res = []
  // base case 
  if(start>end){
    res.push(null)
    return res
  }

  // 1. 穷举root所有可能
  for(let i=start;i<=end;i++){
    // 2. 递归构造左右子树的所有合法BST
    let leftBSTList = buildAllTrees(start,i-1)
    let rightBSTList = buildAllTrees(i+1,end) 
    // 给root节点穷举所有左右子树组合
    // 每次新增root节点避免引用
    for(let left of leftBSTList){
      for(let right of rightBSTList){
        let root = new TreeNode(i)
        root.left = left
        root.right = right 
        res.push(root)
      }
    }
    
  }
  return res
}


// 二叉搜索子树的最大键值和 leetcode 1373
// 站在当前节点，需要考虑：
// 左右子树是不是BST，如果左右子树有一个不是BST，那么以我为根的这棵树肯定不是BST
// 如果左右子树都是合法的BST，需要看看左右子树加上自己是不是合法BST，按照定义，我需要比左子树最大值还要大，同时比右子树最小值要小。
// 题目要算最大节点之和，所以我得知道以我为根的BST左右子树的节点之和。
// 即：
//   1. 左右子树是否为BST
//   2. 左子树最大值以及右子树最小值
//   3. 左子树，右子树节点和。
// 如果放在前序遍历，上面三点每一点都要通过递归计算，加上traverse本身的递归，
// 复杂度会非常高。因此我们应该考虑放在后序遍历，traverse在遍历的过程中顺便
// 把这些条件给算了。

// 定义一个list[] 
// 第0项存储传递上来的子树是否为BST，0不是 1是
// 第1项存储BST最大值
// 第2项存储BST最小值
// 第3项存储BST节点和

let maxSum = 0 // 纪录最大节点之和

const maxSumBST(root){
  traverse(root)
  return maxSum
}

const traverse = function(root){
  let list = []
  if(root === null){
    return [
      1,
      Number.MIN_SAFE_INTEGER
      Number.MAX_SAFE_INTEGER
      0
    ]
  }
  
  // 遍历二叉树
  let leftList = traverse(root.left)
  let rightList = traverse(root.right)

  // 左右子树均为BST，且root.val>左子树最大值以及右子树最小值
  if(
    leftList[0] === 1 && rightList[0] === 1 &&
    root.val>leftList[1] && root.val<rightList[2]
  ){
    // list 计算
    list[0] = 1
    list[1] = Math.max(root.val,rightList[1])
    list[2] = Math.min(root.val,leftList[2])
    list[3] = root.val + left[3] + right[3]
    // 更新全局变量结果
    maxSum = Math.max(maxSum,list[3])
  }else{
    // 非BST树不用管
    list[0] = 0
  }
  return list
}


