// 自定义指令：点击 document 关闭 toast
let onClickDocument = (e) => {
  console.log('hi')
  let {target} = e
  console.log('target',target)
  callbacks.forEach(item => {
    console.log(item)
    console.log(item.el)
    console.log(target)
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
    console.log('bind')
    console.log(el)
    console.log(binding)
    callbacks.push({el,callback:binding.value})
  }
}
