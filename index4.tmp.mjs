let counter = 3
function incCounter(){
  counter++
}
let obj = {a:1}

// module.exports = {
//   counter,
//   incCounter,
//   obj
// }

export default {
  counter,
  incCounter,
  obj
}

// export let counter = 3
// export function incCounter(){
//   counter++
// }

let request = new XMLHttpRequest()
request.open('GET','http://baidu.com',true)
request.onreadystatechange = function(){
  if(request.readyState===4&&request.status === 200){
    console.log(request.responseText)
  }
}
request.send()

function fn(element,eventType,selector,fn){
  element.addEventListener(eventType,e=>{
    let el = e.target
    while(!el.matches(selector)){
      if(element === el){
        el = null
        break
      }
      el = el.parentNode
    }
    el && fn.call(el,e,el)
  })
  return element
}

