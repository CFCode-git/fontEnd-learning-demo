
const LazyMan = (name) => {
  const queue = []
  const task = ()=>{
    console.log(`你好，我是${name}`)
  }
  queue.push(task)

  const api =  {
    _queue:queue,
    sleep(){ },
    eat(type){
      const task = ()=>{
        console.log(`吃${type}`)
      }
      queue.push(task)
      return api
    },
    sleepFirst(n){
      const task = ()=>{
        setTimeout(()=>{
          console.log(`我醒了，我刚睡了${n}秒`)
        },n*1000)
      }
      queue.unshift(task)
      return api
    }
  }
  return api
}

// LazyMan('QY').sleepFirst(5).eat('super')
// 把任务都放到 queue 中，先不执行
