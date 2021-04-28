// 节流
function throttle(fn, delay) {
  let canUse = true
  return function () {
    if (canUse) {
      fn.apply(this, arguments)
      canUse = false
      setTimeout(() => canUse = true, delay * 1000)
    }
  }
}

// 防抖
function debounce(fn,delay){
  let timerId = null
  return function(){
    let context = this
    if(timerId)clearTimeout(timerId)
    timerId = setTimeout(()=>{
      fn.apply(context,arguments)
      timerId=null
    },delay*1000)
  }
}
