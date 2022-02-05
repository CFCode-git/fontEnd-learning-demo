// TreeNode constructor
function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

// 前序(递归) - 序列化与反序列化
{
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
}

// 后序(递归) - 序列化与反序列化
{
  let serialize = function(root) {
    let res = ''
    const handler = (node) => {
      if(node===null){
        res = res + '#' + ','
        return
      }
      handler(node.left)
      handler(node.right)
      res = res + node.val + ','
    }
    handler(root)
    return res
  };

  let deserialize = function(data) {
    let list = data.split(',').filter(Boolean)
    const handler = ( arr )=>{
      if(arr.length===0)return null
      let rootVal = arr.pop()
      if(rootVal === '#')return null
      let root = new TreeNode(rootVal)
      // 后序遍历中,先构造right tree,再构造left tree
      root.right = handler(arr)
      root.left = handler(arr)
      return root
    }
    return handler(list)
  };
}

// 层序(迭代) -- 序列化与反序列化
{
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
}

function binaryTreeToStr (root,type) {
  let res = ''
  switch(type){
    case 'pre':
      preFormatter(root)
      break
    case 'post':
      postFormatter(root)
      break
    default:
      // 层序 - 默认
      defaultFormatter(root)
      break
  }
  function preFormatter(node){
    if(node === null){
      res = res + '#' + ','
      return
    }
    res = res + node.val + ','
    preFormatter(node.left)
    preFormatter(node.right)
  }
  function postFormatter(node){
    if(node===null){
      res = res + '#' + ','
      return
    }
    postFormatter(node.left)
    postFormatter(node.right)
    res = res + node.val + ','
  }

  // 层序遍历
  function defaultFormatter(node){
    if(node===null) return ''
    let queue = [node]
    while(queue.length!==0){
      let parentNode = queue.shift()
      if(!parentNode){
        res = res + '#' + ','
        continue
      }
      res = res + parentNode.val + ','
      queue.push(parentNode.left)
      queue.push(parentNode.right)
    }
  }
  return res
}

function strToBinaryTree (data,type) {
  list = data.split(',').filter(Boolean)
  switch (type) {
    case 'pre':
      return preFormatter(list)
    case 'post':
      return postFormatter(list)
    default:
      // 层序 - 默认
     return defaultFormatter(list)
  }
  function preFormatter(arr){
    if(arr.length===0)return null
    let rootVal = arr.shift()
    if(rootVal === '#') return null
    let root = new TreeNode(rootVal)
    root.left = preFormatter(arr)
    root.right = preFormatter(arr)
    return root
  }
  function postFormatter(arr){
    if(arr.length===0)return null
    let rootVal = arr.pop()
    if(rootVal === '#') return null
    let root = new TreeNode(rootVal)
    root.right = postFormatter(arr)
    root.left = postFormatter(arr)
    return root
  }
  function defaultFormatter(arr){
    if(arr.length===0) return null
    if(arr[0]==='#')return null
    let root = new TreeNode(arr[0])
    let queue = [root]

    for(let i=1;i<arr.length;){
      let parentNode = queue.shift()
      console.log(parentNode)
      let leftChildVal = arr[i]
      i = i + 1
      console.log(leftChildVal)
      if(leftChildVal === '#'){
        parentNode.left = null
      }else{
        parentNode.left = new TreeNode(leftChildVal)
        queue.push(parentNode.left)
      }

      let rightChildVal = arr[i]
      i = i + 1
      if(rightChildVal === '#'){
        parentNode.right = null
      }else{
        parentNode.right = new TreeNode(rightChildVal)
        queue.push(parentNode.right)
      }
    }
    return root
  }
}

// test case
// let root1 = ''
// let root2 = '#,'
// let defaultRoot3 = '1,2,3,4,5,6,#,#,7,8,#,9,10,#,#,#,#,#,#,#,#,'

// let tree1 = strToBinaryTree(root1,'pre')
// let tree2 = strToBinaryTree(root2,'pre')

// let tree3 = strToBinaryTree(defaultRoot3)
// console.log(JSON.stringify(tree3,null,2))
// let postRoot3 = binaryTreeToStr(tree3,'post')
// let preRoot3 = binaryTreeToStr(tree3,'pre')
// console.log(postRoot3)

// let preTree3 = strToBinaryTree(preRoot3,'pre')
// let postTree3 = strToBinaryTree(postRoot3,'post')
// console.log(JSON.stringify(postTree3,null,2))

// const a = JSON.stringify(tree3)
// const b = JSON.stringify(preTree3)
// const c = JSON.stringify(postTree3)
// console.log(a===b)
// console.log(a===c)

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// type: pre, post, default -- 前序 后序 层序
function binaryTreeToArr (root,type) {
  let arr = []
  switch(type){
    case 'pre':
      preTraverse(root)
      break;
    case 'post':
      postTraverse(root)
      break;
    default:
      levelTraverse(root)
      break;
  }
  function preTraverse(root){
    if(root===null){
      arr.push(null)
      return
    }
    arr.push(root.val)
    preTraverse(root.left)
    preTraverse(root.right)
  }


  function postTraverse(root){
    if(root===null){
      arr.push(null)
      return
    }
    postTraverse(root.left)
    postTraverse(root.right)
    arr.push(root.val)
  }


  function levelTraverse(root) {
    if(root === null)return
    let queue = [root]
    while(queue.length!==0){
      let parentNode = queue.shift()
      if(parentNode === null){
        arr.push(null)
      }else{
        arr.push(parentNode.val)
        queue.push(parentNode.left)
        queue.push(parentNode.right)
      }
    }
  }
  return arr
}
function arrToBinaryTree (arr,type) {
  switch(type){
    case 'pre':
      return preTraverse(arr)
    case 'post':
      return postTraverse(arr)
    default:
      return levelTraverse(arr)
  }
  function preTraverse(arr){
    if(arr.length===0)return null
    let rootVal = arr.shift()
    if(rootVal === null) return null
    let root = new TreeNode(rootVal)
    root.left = preTraverse(arr)
    root.right = preTraverse(arr)
    return root
  }


  function postTraverse(arr){
    if(arr.length===0) return null
    let rootVal = arr.pop()
    if(rootVal === null) return null
    let root = new TreeNode(rootVal)
    root.right = postTraverse(arr)
    root.left = postTraverse(arr)
    return root
  }

  function levelTraverse(arr){
    if(arr.length===0)return null
    if(arr[0]===null)return null
    let root = new TreeNode(arr[0])
    let queue = [root]
    for(let i =1; i<arr.length;){
      let parentNode = queue.shift()
      let leftNodeVal = arr[i]
      i = i + 1
      if(leftNodeVal === null){
        parentNode.left = null
      }else{
        parentNode.left = new TreeNode(leftNodeVal)
        queue.push(parentNode.left)
      }
      let rightNodeVal = arr[i]
      i = i + 1
      if(rightNodeVal===null){
        parentNode.right = null
      }else{
        parentNode.right = new TreeNode(rightNodeVal)
        queue.push(parentNode.right)
      }
    }
    return root
  }
}

// test case
let defaultRoot3 = '1,2,3,4,5,6,#,#,7,8,#,9,10,#,#,#,#,#,#,#,#,'.split(',').filter(Boolean).map(value=>{
  return value === '#' ? null : value
})
let tree = arrToBinaryTree(defaultRoot3)
let root2 = binaryTreeToArr(tree,'post')
let root3 = binaryTreeToArr(tree,'pre')
let tree2 = arrToBinaryTree(root2,'post')
let tree3 = arrToBinaryTree(root3,'pre')

// special case
let root11 = [] 
let root22 = [null]
let tree11 = arrToBinaryTree(root22)
console.log('tree1',tree11)
