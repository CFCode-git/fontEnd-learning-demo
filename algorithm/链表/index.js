const PriorityQueueForLinkList = require('../优先级队列')

class ListNode {
  constructor(value) {
    this.val = value
    this.next = null
  }
}

// 合并两个有序链表
const mergeTwoLists = function (list1, list2) {
  let p1 = list1, p2 = list2
  let head
  let current = head = new ListNode()
  while (p1 && p2) {
    if (p1.val <= p2.val) {
      current.next = p1
      p1 = p1.next
    } else {
      current.next = p2
      p2 = p2.next
    }
    current = current.next
  }
  if (p1) {
    current.next = p1
  }
  if (p2) {
    current.next = p2
  }
  return head.next
}

// 合并k个有序链表,借助优先级队列-最小堆,不断将k个链表的头节点放入堆中.
// 借助二叉堆,一次上浮和下沉的时间复杂度为O(logK),一共有N个节点,每个节点
// 都会插入到二叉堆中,因此总体时间复杂度是O(NlogK)
/*
let lists = [
  {val: -4, next: null},
  {val: -10, next: {val: -6, next: {val: -6, next: null}}},
  {val: 0, next: {val: 3, next: null}},
  {val: 2, next: null},
  {val: -10, next: {val: -9, next: {val: -8, next: {val: 3, next: {val: 4, next: {val: 4, next: null}}}}}},
  {
    val: -10,
    next: {val: -10, next: {val: -8, next: {val: -6, next: {val: -4, next: {val: -3, next: {val: 1, next: null}}}}}}
  },
  {val: 2, next: null},
  {val: -9, next: {val: -4, next: {val: -2, next: {val: 4, next: {val: 4, next: null}}}}},
  {val: -4, next: {val: 0, next: null}},
]
*/
const mergeKLists = function (lists) {
  let head
  let current = head = new ListNode()
  let priorityQueue = new PriorityQueueForLinkList('min')

  for (let i = 0; i < lists.length; i++) {
    if (lists[i]) {
      priorityQueue.insert(lists[i])
    }
  }

  while (!priorityQueue.isEmpty()) {
    let node = priorityQueue.del()
    current.next = node
    if (node.next) {
      priorityQueue.insert(node.next)
    }
    current = current.next
  }
  return head.next
}
//let result = mergeKLists(lists)
//console.dir(JSON.stringify(result))

// 单链表的倒数第K个节点
let list = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: {
            val: 6,
            next: null
          }
        }
      }
    }
  }
}
const findLastKth = function (list, k) {
  let p2
  let p1 = p2 = list
  for (let i = 0; i < k; i++) {
    if (p1 === null) {
      console.error('链表不够长')
      return
    } else {
      p1 = p1.next
    }
  }
  while (p1) {
    p1 = p1.next
    p2 = p2.next
  }
  return p2
}

// 删除链表的倒数第K个节点,需要找到倒数K+1个节点
const list2 = {val: 1, next: null}
const deleteLastKth = function (list, k) {
  let dummy = new ListNode()
  dummy.next = list
  let p2
  let p1 = p2 = dummy
  for (let i = 0; i < k + 1; i++) {
    if (p1 === null) {
      console.error('链表不够长')
    } else {
      p1 = p1.next
    }
  }
  while (p1) {
    p1 = p1.next
    p2 = p2.next
  }
  p2.next = p2.next.next
  return dummy.next
}
const result = deleteLastKth(list2, 1)
console.log(JSON.stringify(result))

// 单链表的中点,使用快慢指针
const middleNode = function (list) {
  let slow
  let fast = slow = list
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }
  return slow
}

// 判断链表是否有环,使用快慢指针
const hasCycle = function (list) {
  let flag = false
  let slow
  let fast = slow = list
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      flag = true
      break
    }
  }
  return flag
}

// 如果链表有环,如何计算环起点?
const detectCycle = function (list) {
  let slow
  let fast = slow = list
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) break
  }
  if (fast === null || fast.next === null) {
    return null
  }
  slow = list
  while (slow !== fast) {
    slow = slow.next
    fast = fast.next
  }
  return slow
}

// 两个单链表是否相交,技巧是将两个链表拼接在一起
// p1遍历完链表A后遍历链表B;p2遍历完链表B后遍历链表A,
// 这样两个指针可以同时走到公共部分到达相交节点,
// 如果不存在相交节点,可以理解为相交节点为null
const getIntersectionNode = function (headA, headB) {
  let p1 = headA, p2 = headB
  while (p1 !== p2) {
    if (p1 !== null) {
      p1 = p1.next
    } else {
      p1 = headB
    }
    if (p2 !== null) {
      p2 = p2.next
    } else {
      p2 = headA
    }
  }
  return p1
}

// 递归反转整个链表
const reverse = function (head) {
  if (head === null || head.next === null) {
    return head
  }
  // 递归直到最后一个节点
  const last = reverse(head.next)
  // 关键的两行:反转链表两个节点的方向
  head.next.next = head
  head.next = null
  return last
}

// 过渡:反转链表的前N个节点
let postNode = null // 后置节点
const reverseN = function (head, n) {
  if (n === 1) {
    postNode = head.next // 纪录 last 的后置节点
    return head
  }
  const last = reverseN(head.next, n - 1) // 从head.next开始,反转前n-1个,递归访问直到第n个节点
  head.next.next = head
  head.next = postNode
  return last
}

// 反转链表的一部分 [m,n]
// 特殊情况,当 m === 1 的时候,相当于反转链表的前 N 个节点
// 如果 m != 1 怎么办？
// 关键点:递归至 head 指向 m, 调用 reverseN
// 把 head 的索引置为 1, 如果我们把 head 的索引视为 1，
// 那么我们是想从第 m 个元素开始反转对吧；
// 如果把 head.next 的索引视为 1 呢？
// 那么相对于 head.next，反转的区间应该是从第 m - 1 个元素开始的；
// 那么对于 head.next.next 呢……
const reverseBetween = function (head, m, n) {
  if (m === 1) {
    return reverseN(head, n)
  }
  head.next = reverseBetween(head.next, m - 1, n - 1)
  return head
}

// k个一组反转链表,如果最后的元素不足k个就保持不变,
// 这个问题具有递归性质, 思路:
// 1. 先反转以 head 开头的 k 个元素,反转后的头节点指向下一次递归
// 2. 将 k+1 个元素作为 head 递归调用 reverseKGroup 函数
// 先实现链表的迭代反转:
// 反转单链表 [迭代]
const reverse2 = function (head) {
  let pre = null, current = head, next = head
  while (current !== null) {
    next = current.next
    current.next = pre
    pre = current
    current = next
  }
  return pre
}
// 上面反转单链表实际上就是反转head与null之间的节点,
// 那么反转[a,b)之间的节点,只需要将null改为b即可
const reverseAB = function (head, b) {
  let pre = null, current = head, next = head
  while (current !== b) {
    next = current.next
    current.next = pre
    pre = current
    current = next
  }
  // 反转后的头节点
  return pre
}
// 结合上面的函数,按照之前的逻辑就可以实现reverseKGroup函数
const reverseKGroup = function (head, k) {
  let b = head
  // 计算不足k个不需要反转,直接将head返回
  for (let i = 0; i < k; i++) {
    if (b === null) {
      return head
    }
    b = b.next
  }

  const newHead = reverseAB(head, b)
  head.next = reverseKGroup(b, k) // b是head以后的第k个节点
  return newHead
}

// 判断回文单链表
// 最简单的思路:将链表反转,对比两个链表是否相同.
// 或者通过双指针判断回文(栈结构)
// 时间和空间复杂度为O(n)
let leftNode = null // 左节点
const isPalindrome = function (head) {
  leftNode = head // 左节点为链表的头节点
  let result = traverse(head)
}
const traverse = function (rightNode) { // 右节点
  if (rightNode === null) return true
  let res = traverse(rightNode.next)
  // 后序遍历链表 直到链表末端,也就是返回的结果为true的时候
  res = res && (leftNode.val === rightNode.val)
  leftNode = leftNode.next // 判断完一次右移一次
  return res
}

// 判断回文单链表:优化空间复杂度
// 通过快慢指针找到链表的中点,中点往后的链表直接反转,
// slow指针和头指针逐个遍历对比
// 时间复杂度O(n),空间复杂度O(1)
const reverse3 = function (head) {
  let current, prev, next
  current = next = head
  prev = null
  while(current!==null){
    next = current.next
    current.next = prev
    prev = current
    current = next
  }
  return prev
}
const isPalindrome2 = function(head){
  let fast,slow
  fast = slow = head
  while(fast!==null&&fast.next!==null){
    slow = slow.next
    fast = fast.next.next
  }
  // 当链表有奇数个节点时,slow 需要再往前一个,
  // 因为要忽略当前 slow 所在的中点
  // 当 fast 不为 null 时,表示链表有奇数个节点
  if(fast!==null){
    slow = slow.next
  }
  let flag
  let left = head
  let right = flag = reverse3(slow)
  while(right!==null){
    if(right.val !== left.val)return false
    right = right.next
    left = left.next
  }
  // 遍历完成后,将链表恢复原状,
  // 因为奇数个节点的时候slow多走了一步
  // 这里直接让left.next = 反转后的子链表即可
  left.next = reverse3(flag)
  return true
}
