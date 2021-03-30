const loaderUtils = require('loader-utils')
module.exports = function (source) {
  const options = loaderUtils.getOptions(this)
  const result = source.replace('loader', options.name)
  // return result
  this.callback(null, result, null, null)
  // this.callback(error,content,sourceMap,meta)
}
