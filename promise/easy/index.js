class Promise2 {
  successQueue = []
  failQueue = []

  constructor(fn) {
    const resolve = (data) => {
      setTimeout(()=>{
        for(let i=0;i<this.successQueue.length;i++){
          this.successQueue[i](data)
        }
      })
    }
    const reject = (reason) => {
      setTimeout(()=>{
        for(let i=0;i<this.failQueue.length;i++){
          this.failQueue[i](reason)
        }
      })
    }
    fn(resolve, reject)
  }

  then(success,fail) {
    this.successQueue.push(success)
    this.failQueue.push(fail)
    return this
  }
}

const p1 = new Promise2((resolve, reject) => {
  console.log('hi')
  if(Math.random()<0.5){
    resolve('success')
  }else{
    reject('fail')
  }
})
p1
  .then((data) => {console.log('成功')},(reason)=>{console.log('失败')})
  .then((data)=>{console.log('成功2')},(reason)=>{console.log('失败2')})
