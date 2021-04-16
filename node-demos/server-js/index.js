var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定您的端口号，\n 比如：node server.js 8888')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  var path = parsedUrl.pathname  // /index.html, /index.css ...
  var query = parsedUrl.query
  var method = request.method

  // Let's begin
  console.log('收到请求了，路径（带查询参数）为：', pathWithQuery)

  response.statusCode = 200
  const filePath = path === '/' ? '/index.html' : path // /index.html, /index.css ...
  const index = path.lastIndexOf('.')
  const suffix = path.substring(index) // suffix : 后缀 // .html .css .js ...
  const fileType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
  }

  response.setHeader('Content-Type', `${fileType[suffix] || 'text/html'};charset=utf-8`)
  let content
  try {
    content = fs.readFileSync(`./public${filePath}`)
  } catch (error) {
    content = '页面不存在'
    response.statusCode = 404
  }
  response.write(content)
  response.end()
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n访问地址：http://localhost:' + port)

