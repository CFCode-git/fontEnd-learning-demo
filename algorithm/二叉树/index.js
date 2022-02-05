// 计算二叉树的最大深度(根节点到最远叶子节点的最长路径上的节点数)
// 思路一:遍历一遍二叉树,通过一个外部变量纪录节点所在深度,得到最大值.
// 遍历二叉树计算答案
class TreeNode {
  constructor(val, left, right) {
    this.val = val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : left;
  }
}

let tree = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: null,
    right: null,
  },
};

let result = 0; // 纪录最大深度
let depth = 0; // 纪录遍历过程中的叶子节点深度
// 主函数
const calcMaxDepth = (tree) => {
  traverse(tree);
  return result;
};
// 遍历函数
const traverse = (root) => {
  if (root === null) {
    result = Math.max(result, depth);
    return;
  }
  depth++;
  traverse(root.left);
  traverse(root.right);
  depth--;
};

// 思路二:通过子树的最大高度推导
// 分解问题计算答案
const calcMatDepth2 = (root) => {
  if (root === null) return 0;
  // 计算左右子树的最大深度
  let leftMax = calcMatDepth2(root.left);
  let rightMax = calcMatDepth2(root.right);
  // 以当前节点为根节点的树的最大深度 = 左右子树的最大深度+根节点自己
  let res = Math.max(leftMax, rightMax) + 1;
  return res;
};

// 计算二叉树的直径(P.S.直径就是一个二叉树内两个节点的最大距离)
// 解法:一棵二叉树的直径等于左右子树的深度之和
// 方法1:后序遍历
let myDiameter = 0;
const diameterOfBinaryTree = function (root) {
  maxDepth(root);
  return myDiameter;
};

const maxDepth = function (root) {
  if (root === null) {
    return 0;
  }
  let maxLeft = maxDepth(root.left);
  let maxRight = maxDepth(root.right);
  // 计算最大直径
  let maxDiameter = maxLeft + maxRight;
  myDiameter = Math.max(maxDiameter, myDiameter);
  return 1 + Math.max(maxLeft, maxRight);
};

// 方法2:前序遍历
// [不推荐，因为这里会两次遍历二叉树，时间复杂度为O(n^2)]
const diameterOfBinaryTree2 = function (root) {
  traverse2(root);
  return myDiameter;
};
const traverse2 = function (root) {
  if (root === null) {
    return;
  }

  // 计算每个节点直径,更新结果
  let maxLeft = maxDepth2(root.left);
  let maxRight = maxDepth2(root.right);
  let maxDiameter = maxLeft + maxRight;
  myDiameter = Math.max(myDiameter, maxDiameter);

  traverse(root.left);
  traverse(root.right);
};
const maxDepth2 = function (root) {
  if (root === null) return 0;
  let leftMax = maxDepth(root.left);
  let rightMax = maxDepth(root.right);
  return 1 + Math.max(leftMax, rightMax);
};

// 翻转二叉树
const invertTree = function (root) {
  if (root !== null) {
    invertTree(root.left);
    invertTree(root.right);
    let tmp = root.right;
    root.right = root.left;
    root.left = tmp;
  }
  return root;
};

// 填充每个节点的下一个右侧节点指针
const connect = function (root) {
  if (root === null) return null;
  connectTwoNode(root.left, root.right);
  return root;
};
// 辅助函数,用来链接传入的两个node
// 链接情况:
// node1 > node2
// node1.left > node1.right;
// node2.left > node2.right;
// node1.right > node2.left;
const connectTwoNode = function (node1, node2) {
  if (node1 === null || node2 === null) return;
  node1.next = node2;
  // 链接相同父节点的两个子节点
  connectTwoNode(node1.left, node1.right);
  connectTwoNode(node2.left, node2.right);
  // 链接不同父节点的两个子节点
  connectTwoNode(node1.right, node2.left);
};

// 二叉树展开为链表
// 思路：将左右子树展开为链表（拉平）
// 然后将右子树接到左子树上，然后整棵左子树作为右子树
const flatten = function (root) {
  if (root === null) return;
  flatten(root.left); // 展开左子树
  flatten(root.right); // 展开右子树

  // 后序遍历，左右子树已经展开
  let left = root.left;
  let right = root.right;

  // 左子树作为右子树
  root.left = null;
  root.right = left;

  // 将原来的右子树接到左子树末端
  let p = root; // 遍历指针
  while (p.right) {
    p = p.right;
  }
  p.right = right;
};

// 最大二叉树
let list = [3, 2, 1, 6, 0, 5];
const constructMaxmumBinaryTree = function (nums) {
  return build(nums);
};

const build = function (nums) {
  if (nums.length === 0) return null;

  // 找nums中的最大值
  let index = 0;
  let maxVal = nums[0];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > maxVal) {
      index = i;
      maxVal = nums[i];
    }
  }
  let left = nums.slice(0, index);
  let right = nums.slice(index + 1, nums.length);

  let root = new TreeNode(maxVal);

  root.left = build(left); // 左边的子数组
  root.right = build(right); // 右边的子数组

  return root;
};

// 从前序与中序遍历序列构造二叉树(val不重复)[画个图吧亲]
// 前序遍历:[root,...root.left,...root.right]
// 中序遍历:[...root.left,root,...root.right]
// 关键点：找出root.left,root,root.right之间的分界
// let preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
const buildTree = function (preorder, inorder) {
  return build2(
    preorder,
    0,
    preorder.length - 1,
    inorder,
    0,
    inorder.length - 1,
  );
};

const build2 = function (preorder, preStart, preEnd, inorder, inStart, inEnd) {
  // base case
  if (preStart > preEnd) {
    return null;
  }

  let rootVal = preorder[preStart]; // root节点为前序遍历的第一个值

  // 得到root节点在中序遍历的位置 >> 子树inStart和inEnd的索引
  let inRootIndex = 0;
  for (let i = 0; i < inorder.length; i++) {
    if (inorder[i] === rootVal) {
      inRootIndex = i;
      break;
    }
  }

  let root = new TreeNode(rootVal);

  // root.left 的 inStart === 当前 inorder 的 inStart
  // root.left 的 inEnd === root 左边的值的 index
  // root.right 的 instart === root 右边的值的 index
  // root.right 的 inEnd === 当前 inorder 的 inEnd

  // root.left 的 preStart === 当前 preorder 的 root 的下一个 >> preStart + 1
  // root.left 的 preEnd === ?? >> 借助inorder的left的长度计算 >> 当前preorder的preStart + leftSize
  // root.right 的 preStart === ?? 借助inorder的left的长度计算 >>  当前preorder的preStart + leftSize + 1
  // root.right 的 preEnd === 当前 preorder 的 preEnd >> preEnd
  let leftSize = inRootIndex - inStart; // left 长度

  root.left = build2(
    preorder,
    preStart + 1,
    preStart + leftSize,
    inorder,
    inStart,
    inRootIndex - 1,
  );
  root.right = build2(
    preorder,
    preStart + leftSize + 1,
    preEnd,
    inorder,
    inRootIndex + 1,
    inEnd,
  );

  return root;
};

// 从中序与后序遍历序列构造二叉树 (val唯一)
// 中序遍历 [root.left,root,root.right]
// 后序遍历 [root.left,root.right,root]
const inorder = [9, 3, 15, 20, 7];
const postorder = [9, 15, 7, 20, 3];
const buildTree2 = function (inorder, postorder) {
  return build3(
    inorder,
    0,
    inorder.length - 1,
    postorder,
    0,
    postorder.length - 1,
  );
};
const build3 = function (
  inorder,
  inStart,
  inEnd,
  postorder,
  postStart,
  postEnd,
) {
  // base case
  if (postStart > postEnd) return null;
  // 树的根节点值
  const rootNodeVal = postorder[postEnd];
  // 获取根节点在 inorder 中的 index
  let inorderRootIndex = 0;
  for (let i = 0; i < inorder.length; i++) {
    if (inorder[i] === rootNodeVal) {
      inorderRootIndex = i;
      break;
    }
  }
  // 计算left的长度
  let leftSize = inorderRootIndex - inStart;

  let root = new TreeNode(rootNodeVal);

  root.left = build3(
    inorder,
    inStart,
    inorderRootIndex - 1,
    postorder,
    postStart,
    postStart + leftSize - 1,
  );
  root.right = build3(
    inorder,
    inorderRootIndex + 1,
    inEnd,
    postorder,
    postStart + leftSize,
    postEnd - 1,
  );

  return root;
};

// 根据前序与后序遍历构造二叉树 leetcode:889
// 思路：
// 1. 把前序遍历第一个元素作为根节点的值
// 2. 把前序遍历的第二个元素作为左子树根节点的值
// 3. 在后序遍历结果中寻找左子树根节点的值，确定左子树的索引边界，
//    递归构造左右子树即可.
const pre = [1, 2, 4, 5, 3, 6, 7],
  post = [4, 5, 2, 6, 7, 3, 1];
const constructFromPrePost = function (preorder, postorder) {
  return build4(
    preorder,
    0,
    preorder.length - 1,
    postorder,
    0,
    postorder.length - 1,
  );
};

const build4 = function (
  preorder,
  preStart,
  preEnd,
  postorder,
  postStart,
  postEnd,
) {
  if (preStart > preEnd) return null;
  // 这儿是因为后面的步骤关键是要拿到第二个元素，所以当只有一个元素的时候
  // 也是base case
  if (preStart === preEnd) return new TreeNode(preorder[preStart]);

  let rootVal = preorder[preStart]; // 根元素
  let leftChildVal = preorder[preStart + 1]; // 左子树根元素

  // 获取左子树根元素在postorder中的索引
  let leftChildIndex = 0;
  for (let i = 0; i < postorder.length; i++) {
    if (postorder[i] === leftChildVal) {
      leftChildIndex = i;
      break;
    }
  }

  // 计算左子树的元素个数，与中序遍历结果的算法不同，
  // 这儿通过左子树的根元素进行计算，索引从0开始，需要+1
  let leftSize = leftChildIndex - postStart + 1;

  let rootNode = new TreeNode(rootVal);
  rootNode.left = build4(
    preorder,
    preStart + 1,
    preStart + leftSize,
    postorder,
    postStart,
    leftChildIndex,
  );
  rootNode.right = build4(
    preorder,
    preStart + leftSize + 1,
    preEnd,
    postorder,
    leftChildIndex + 1,
    postEnd - 1,
  );
  return rootNode;
};

// 寻找重复子树 leetcode652
// 重点：
// 1. 一棵子树要知道自己是否重复，就要知道以自己为根的子树长什么样，
//    要达到这个目的需要用到后序遍历。
//    通过序列化二叉树描述二叉树的结构。
// 2. 也要知道别的子树长什么样，要做到这一点，需要在每次遍历节点后，
//    将序列化的子树结果放在一个外部数据结构中保存。通过Map存储子树结果，同时可以纪录重复次数.

/*  二叉树序列化  */
// 使用『#』表示空指针，使用『，』分隔二叉树节点
function treeStringify(root) {
  if (root === null) return '#';
  let left = treeStringify(root.left);
  let right = treeStringify(root.right);
  let res = left + ',' + right + ',' + root.val;
  return res;
}

let testTree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: null,
  },
  right: {
    val: 3,
    left: {
      val: 2,
      left: {
        val: 4,
        left: null,
        right: null,
      },
      right: null,
    },
    right: {
      val: 4,
      left: null,
      right: null,
    },
  },
};

const treeMap = new Map();
const list2 = [];

function findDuplicateSubtrees(root) {
  handler(root);
  return list2;
}
const handler = (root) => {
  if (root === null) return '#';
  let left = handler(root.left);
  let right = handler(root.right);
  // 这里的res就是当前root序列化的结果，在map里面找是否重复。
  let res = left + ',' + right + ',' + root.val;

  if (treeMap.has(res)) {
    // map 中有这个子树, 如果num===1, push进list2, num+1
    let num = treeMap.get(res);
    if (num === 1) {
      list2.push(root);
    }
    treeMap.set(res,num+1)
  } else {
    // map中没有这个子树,进map
    treeMap.set(res,1)
  }

  return res;
};

// 二叉树的序列化与反序列化 leetcode 297
// 一般情况下单纯依靠前序遍历是无法实现序列化和反序列化的，因为缺少null节点的信息，至少需要前，中，后序遍历中的两种。
// 这里的序列化包含了空指针的信息。
const testStr = "1,2,#,4,#,#,3,#,#,"
const testStr2 = "1,2,3,#,5,"
// 前序遍历
// 序列化
var serialize = function(root) {
  let res = ''
  const handler = function(node){
    if(node===null) {
      res = res + '#' + ','
      return
    }
    res = res + node.val + ','
    handler(node.left)
    handler(node.right)
  } 
  handler(root)
  return res
};

// 反序列化
var deserialize = function(data) {
  let list = data.split(',').filter(Boolean)
  const handler = (arr) => {
    if(arr.length === 0) return null
    let rootVal = arr.shift(0)
    if(rootVal==='#')return null
    let root = new TreeNode(rootVal)
    root.left = handler(arr)
    root.right = handler(arr)
    return root
  } 
  return handler(list)
};
// console.log('testStr2',testStr2)
// let a = deserialize(testStr2)
// console.log(JSON.stringify(a,null,2));
// const b = serialize(a)
// console.log('b',b)
// const c = deserialize(b)
// console.log(JSON.stringify(c,null,2));

// 后序遍历
// 序列化
var serialize = function(root) {
  let res = '' 
  const handler = (root) => {
    if(root===null){
      res = res + '#' + ','
    }
    handler(root.left)
    handler(root.right)
    res = res.val + '#' + ','
  }
  handler(root)
  return res
};

// 反序列化
var deserialize = function(data) {
  let list = data.split(',').filter(Boolean)
  const handler = (arr) => {
    if(arr.length===0)return null
    let rootVal = arr.pop()
    if(rootVal==='#')return null
    let root = new TreeNode(rootVal)
    // 后序遍历先构造right树，再构造left树
    root.right = handler(arr)
    root.left = handler(arr)
    return root
  }
  return handler(list)
};
// 中序遍历无法deserialize,因为无法确定root节点的位置

// 层级遍历
// 序列化
var serialize = function(root) {
   let res = ''
  if(root===null) return ''
  let queue = [root]
  while(queue.length!==0){
    let parentNode = queue.shift()
    if(parentNode === null){
      res = res + '#' + ','
      continue
    }
    res = res + parentNode.val + ','
    queue.push(parentNode.left)
    queue.push(parentNode.right)
  }
  return res   
};

// 反序列化
var deserialize = function(data) {
   if(data === '') return null
  let list = data.split(',').filter(Boolean)
  if(list.length===0)return null
  let root = new TreeNode(list[0])
  let queue = [root]
  for(let i=1;i<list.length;){
    let parentNode = queue.shift()
    let left = list[i++]
    if(left === '#'){
      parentNode.left = null
    }else{
      parentNode.left = new TreeNode(left)
      queue.push(parentNode.left)
    }
    let right = list[i++]
    if(right === '#'){
      parentNode.right = null
    }else{
      parentNode.right = new TreeNode(right)
      queue.push(parentNode.right)
    }
  }
  return root   
};




