// const loaderUtils = require('loader-utils')

module.exports = function(source){
  // const options = loaderUtils.getOptions(this)
  this.callback = this.async()
  setTimeout(()=>{
    const result = source.toUpperCase()
    this.callback(null,result,null,null)
  },1000)
}
