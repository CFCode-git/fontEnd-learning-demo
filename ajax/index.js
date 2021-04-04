// 手写 ajax

var request = new XMLHttpRequest()
request.open('GET','/a/b/c?name=fff',true)
request.onreadystatechange = function(){
  if(request.readyState === 4 && request.status === 200){
    console.log(request.responseText)
  }
}
request.send()


/**
 * request.readyState
 * 0 代理已被创建，还没调用 open 方法
 * 1 open() 已经被调用
 * 2 send() 方法已经被调用
 * 3 下载中，responseText 属性已包含部分数据
 * 4 下载操作已完成
 **/
