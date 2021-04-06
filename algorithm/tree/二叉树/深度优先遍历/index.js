// 不用 递归 和 栈 实现三种深度遍历


// 先序
{
  var morrisPre = function(head) {
    if(!head) {
      return
    }
    var cur1 = head,
      cur2 = null
    while(cur1) {
      cur2 = cur1.left
      if(cur2) {
        while(cur2.right && cur2.right != cur1) {
          cur2 = cur2.right
        }
        if(!cur2.right) {
          cur2.right = cur1
          console.log(cur1.value)
          cur1 = cur1.left
          continue
        } else {
          cur2.right = null
        }
      } else {
        console.log(cur1.value)
      }
      cur1 = cur1.right
    }
  }
}

// 中序
{
  var morrisIn = function(head) {
    if(!head) {
      return
    }
    var cur1 = head,
      cur2 = null
    while(cur1) {
      cur2 = cur1.left
      if(cur2) {
        while(cur2.right && cur2.right !== cur1) {
          cur2 = cur2.right
        }
        if(!cur2.right) {
          cur2.right = cur1
          cur1 = cur1.left
          continue
        } else {
          cur2.right = null
        }
      }
      console.log(cur1.value)
      cur1 = cur1.right
    }
  }
}


// 后序
{
  var morrisPost = function(head) {
    if(!head) {
      return
    }
    var cur1 = head,
      cur2 = null
    while(cur1) {
      cur2 = cur1.left
      if(cur2) {
        while(cur2.right && cur2.right !== cur1) {
          cur2 = cur2.right
        }
        if(!cur2.right) {
          cur2.right = cur1
          cur1 = cur1.left
          continue
        } else {
          cur2.right = null
          printEdge(cur1.left)
        }
      }
      cur1 = cur1.right
    }
    printEdge(head)
  }

  var printEdge = function(head) {
    var tail = reverseEdge(head)
    var cur = tail
    while(cur) {
      console.log(cur.value)
      cur = cur.right
    }
    reverseEdge(tail)
  }

  var reverseEdge = function(head) {
    var pre = null,
      next = null
    while(head) {
      next = head.right
      head.right = pre
      pre = head
      head = next
    }
    return pre
  }
}


