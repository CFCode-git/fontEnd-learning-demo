// 二叉搜索树
function BST (root,target){
  if(root.val === target){
    // found, do something
  }
  if(root.val<target){
    BST(root.right,target)
  }
  if(root.val>target){
    BST(root.left,target)
  }
}
