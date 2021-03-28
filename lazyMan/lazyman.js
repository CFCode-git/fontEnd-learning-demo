// lazyMan 任务队列 调用链 工厂函数

const LazyMan = (name) => {
  const queue = []
  const task = ()=>{
    console.log(`你好，我是${name}`)
    next()
  }
  queue.push(task)
  const next = ()=>{
    const first = queue.shift()
    first?.()
  }
  const api =  {
    _queue:queue,
    sleep(n){
      const task = () => {
        setTimeout(()=>{
          console.log(`我醒了，我刚睡了${n}秒`)
          next()
        },n*1000)
      }
      queue.push(task)
      return api
    },
    eat(type){
      const task = ()=>{
        console.log(`吃${type}`)
        next()
      }
      queue.push(task)
      return api
    },
    sleepFirst(n){
      const task = ()=>{
        setTimeout(()=>{
          console.log(`我醒了，我刚睡了${n}秒`)
          next()
        },n*1000)
      }
      queue.unshift(task)
      return api
    }
  }
  setTimeout(()=>{
    next()
  })
  return api
}

// LazyMan('QY')
// LazyMan('QY').sleep(2).eat('午餐')
// LazyMan('QY').eat('午餐').eat('晚餐')
// LazyMan('QY').sleepFirst(2).eat('晚餐')
// LazyMan('QY').sleep(2).eat('午餐').sleepFirst(2).sleep(5).eat('晚餐').sleepFirst(4)
