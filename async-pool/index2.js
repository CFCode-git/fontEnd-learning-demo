/*
* 请实现如下的函数，可以批量请求数据，所有的 URL 地址在 urls 参数中，同时可以通过 max 参数控制请求的并发度，
* 当所有请求结束之后，需要执行 callback 回调函数，发请求的函数可以直接使用 fetch 即可
*
*   function sendRequest(urls: string[], max: number, callback: () => void) {
*
*   }
*/

let urls = new Array(24).fill(true).map((x, i) =>
  `https://github.com/hstarorg/HstarDoc/issues/${i + 1}`);

function fakeFetch (url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(url)
      resolve(url)
    }, 2000)
  })
}

sendRequest(urls, 5, function() {
  console.log('done')
})

{
  function sendRequest(urls,max,callback){
    const length = urls.length
    let idx = 0
    let counter = 0

    function _request(){
      while(idx < length && max > 0){
        max--; // 占用通道
        fakeFetch(urls[idx++]).finally(()=>{
          max++; // 释放通道
          counter++
          if(counter === length){
            return callback()
          }else{
            _request()
          }
        })
      }
    }
    _request()
  }

}
