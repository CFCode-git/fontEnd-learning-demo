// 自定义指令：点击 document 关闭 toast
let onClickDocument = (e) => {
  let {target} = e
  callbacks.forEach(item => {
    if(item.el === target || item.el.contains(target)){
      return
    }else{
      item.callback()
    }
  })
}

document.addEventListener('click',onClickDocument)
let callbacks = [] // 防止有多个 toast

export default {
  bind(el,binding,vnode){
    callbacks.push({el,callback:binding.value})
  }
}
