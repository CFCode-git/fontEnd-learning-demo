// 优先级队列,基于二叉堆实现,主要Api是insert插入一个元素,和delMax删除最大元素
// https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484495&idx=1&sn=bbfeba9bb5cfd50598e2a4d08c839ee9&scene=21#wechat_redirect
// https://labuladong.gitee.io/algo/2/20/51/
/*
* 二叉堆删除和插入元素的时间复杂度为O(logK) 其中K是当前二叉堆中的元素总数
* 因为时间复杂度主要花费在sink和swim上,不论是上浮还是下沉,最多就是树的高度
* 也就是log级别
* */
class MaxPQ{
  constructor() {
    this.list = []
    this.N = 0 // 元素个数
  }
  // 上浮,当 k 比它的父节点要大的时候, k 上浮和父节点交换
  swim(k){
    // k <= 1 的时候到达堆顶, 不再上浮
    while(k > 1 && this.less(this.parent(k),k)){
      // k 的父节点比 k 小的话, k 上浮
      this.exchange(this.parent(k),k)
      k = this.parent(k)
    }
  }
  // 下沉,当 k 比它的子节点要小的时候,k 下沉和较大值换
  sink(k){
    let length = this.N
    while(this.left(k)<=length){
      let older = this.left(k)
      // 取左右节点较大值
      if(this.right(k)<=length && this.less(older,this.right(k))){
        older =  this.right(k)
      }
      // 如果 k 比 子节点中的 较大值 要小,则下沉,否则结束 while 循环
      if(this.less(k,older)){
        // 下沉 k 节点
        this.exchange(k,older)
        k = older
      }else{
        break
      }
    }
  }
  // 删除最大元素, 对调第一个元素和最后一个元素,删除最后一个元素,下沉第一个元素
  delMax(){
    this.exchange(1,this.N)
    let max = this.list.pop()
    this.N--
    this.sink(1)
    return max
  }
  // 插入元素
  insert(e){
    this.N++ // this.N 从 1 开始
    this.list[this.N] = e
    this.swim(this.N)  // 插入元素上浮
  }

  // i 是否比 j 小
  less(i,j){
    return this.list[i] < this.list[j]
  }
  exchange(i,j){
    let temp = this.list[i]
    this.list[i] = this.list[j]
    this.list[j] = temp
  }
  left(node){
    return node * 2
  }
  right(node){
    return node * 2 +1
  }
  parent(node){
    return Math.floor(node / 2)
  }
  showList(){
    return this.list
  }
}
/*
let arr = new MaxPQ()
arr.insert(1)
arr.insert(13)
arr.insert(31)
arr.insert(53)
arr.insert(16)
arr.insert(27)
arr.insert(8)
arr.insert(16)
arr.insert(18)
arr.insert(27)
arr.insert(81)
arr.insert(112)
arr.insert(75)
arr.insert(66)
arr.insert(40)
arr.insert(33)
arr.insert(101)
arr.insert(96)

console.log(arr.returnList())
let a = arr.delMax()
console.log(a)
console.log(arr.showList())
 */

class MinPQ{
  constructor(){
    this.list = []
    this.N = 0
  }
  insert(e){
    this.N++
    this.list[this.N] = e
    this.swim(this.N)
  }
  delMin(){
    this.exchange(1,this.N)
    let min = this.list.pop()
    this.N--
    this.sink(1)
    return min
  }
  // 上浮,如果k比它的父亲节点要小,同时k不是堆顶,那么k节点要上浮
  swim(k){
    while(k>1 && this.less(k,this.parent(k))){
      this.exchange(k,this.parent(k))
      k = this.parent(k)
    }
  }
  // 下沉,当k有子节点,而且k比它的子节点的最小值要大,那么k节点要下沉,和最小值置换
  sink(k){
    // 小于等于,左子节点有可能是数组最后一个元素
    while(this.left(k)<=this.N){
      // 假设左子节点比较小
      let least = this.left(k)
      if(this.right(k)<=this.N && this.less(this.right(k),least)){
        // 当存在右子节点,且右边子节点比左子节点小
        least = this.right(k)
      }
      // 当 k 小于子节点的最小值,不必下沉
      if(this.less(k,least))break;
      // 否则不符合最小堆的结构,下沉k节点
      this.exchange(k,least)
      k = least
    }
  }

  less(i,j){
    return this.list[i] < this.list[j]
  }
  exchange(i,j){
    let temp = this.list[i]
    this.list[i] =this.list[j]
    this.list[j] = temp
  }
  parent(n){
    return Math.floor(n/2)
  }
  left(n){
    return n*2
  }
  right(n){
    return n*2+1
  }
  showList(){
    return this.list
  }
}

/*
let arr = new MinPQ()
arr.insert(112)
arr.insert(31)
arr.insert(16)
arr.insert(27)
arr.insert(1)
arr.insert(8)
arr.insert(18)
arr.insert(53)
arr.insert(27)
arr.insert(81)
arr.insert(13)
arr.insert(75)
arr.insert(66)
arr.insert(40)
arr.insert(33)
arr.insert(101)
arr.insert(16)
arr.insert(96)

console.log(arr.showList())
let a = arr.delMin()
console.log(a)
console.log(arr.showList())
 */

class PriorityQueue{
  constructor(compareFn){
    this.list = [null]
    this.N = 0
    this.compareFn = compareFn === 'max' ?
      // 大顶堆
      function(i,j){
        return this.list[i]>this.list[j]
      } :
      // 小顶堆
      function(i,j){
        return this.list[i]<this.list[j]
      }
  }
  // 下沉
  sink(n){
   while(this.left(n)<=this.N){
     let index = this.left(n)
     if(this.right(n)<=this.N && this.compareFn(this.right(n),index)){
       index = this.right(n)
     }
     if(this.compareFn(n,index)) break;
     this.exchange(n,index)
     n = index
   }
  }
  // 上浮
  swim(n){
    while(n>1 && this.compareFn(n,this.parent(n))){
      this.exchange(n,this.parent(n))
      n = this.parent(n)
    }
  }
  // 删除堆顶
  del(){
    this.exchange(1,this.N)
    let value = this.list.pop()
    this.N--
    this.sink(1)
    return value
  }
  // 插入元素
  insert(value){
    this.N++
    this.list[this.N]=value
    this.swim(this.N)
  }
  exchange(i,j){
    let temp = this.list[i]
    this.list[i] = this.list[j]
    this.list[j]=temp
  }
  parent(nodeIndex){
    return Math.floor(nodeIndex/2)
  }
  left(nodeIndex){
    return nodeIndex*2
  }
  right(nodeIndex){
    return nodeIndex*2+1
  }
  showList(){
    return this.list
  }
  isEmpty(){
    return this.N === 0
  }
}
/*
let arr = new PriorityQueue('min')
arr.insert(112)
arr.insert(31)
arr.insert(16)
arr.insert(27)
arr.insert(1)
arr.insert(8)
arr.insert(18)
arr.insert(53)
arr.insert(27)
arr.insert(81)
arr.insert(13)
arr.insert(75)
arr.insert(66)
arr.insert(40)
arr.insert(33)
arr.insert(101)
arr.insert(16)
arr.insert(96)

console.log(arr.showList())
let a = arr.del()
console.log(a)
console.log(arr.showList())
 */

class PriorityQueueForLinkList{
  constructor(compareFn){
    this.list = [null]
    this.N = 0
    this.compareFn = compareFn === 'max' ?
      // 大顶堆
      function(i,j){
        return this.list[i].val>this.list[j].val
      } :
      // 小顶堆
      function(i,j){
        return this.list[i].val<this.list[j].val
      }
  }
  // 下沉
  sink(n){
    while(this.left(n)<=this.N){
      let index = this.left(n)
      if(this.right(n)<=this.N && this.compareFn(this.right(n),index)){
        index = this.right(n)
      }
      if(this.compareFn(n,index)) break;
      this.exchange(n,index)
      n = index
    }
  }
  // 上浮
  swim(n){
    while(n>1 && this.compareFn(n,this.parent(n))){
      this.exchange(n,this.parent(n))
      n = this.parent(n)
    }
  }
  // 删除堆顶
  del(){
    this.exchange(1,this.N)
    let value = this.list.pop()
    this.N--
    this.sink(1)
    return value
  }
  // 插入元素
  insert(value){
    this.N++
    this.list[this.N]=value
    this.swim(this.N)
  }
  exchange(i,j){
    let temp = this.list[i]
    this.list[i] = this.list[j]
    this.list[j]=temp
  }
  parent(nodeIndex){
    return Math.floor(nodeIndex/2)
  }
  left(nodeIndex){
    return nodeIndex*2
  }
  right(nodeIndex){
    return nodeIndex*2+1
  }
  showList(){
    return this.list
  }
  isEmpty(){
    return this.N === 0
  }
}
module.exports = PriorityQueueForLinkList
