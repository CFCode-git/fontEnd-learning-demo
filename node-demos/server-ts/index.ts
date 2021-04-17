import * as http from 'http';
import * as fs from 'fs';
import * as p from 'path';
import * as url from 'url';
import {IncomingMessage, ServerResponse} from 'http';

const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public'); // 资源目录
let cacheAge = 3600 * 24 * 365; // 默认缓存一年

server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const {method, url: path, headers} = request;
  const {pathname, query} = url.parse(path);
  // 如果不是 get 请求，返回405
  if (method !== 'GET') {
    response.statusCode = 405; // 405表示请求方法(get post head put ...)不对
    response.end();
    return;
  }
  // 路径名 去除 / 得到 文件名
  let fileName = pathname.substr(1);
  if (fileName === '') {
    fileName = 'index.html';
  }
  // response.setHeader('Content-Type','text/html;charset=utf-8')
  fs.readFile(p.resolve(publicDir, fileName), (error, data) => {
    // 错误处理
    if (error) {
      // console.log(error);
      if (error.errno === -4058) {
        response.statusCode = 404;
        fs.readFile(p.resolve(publicDir, '404.html'), (error, data) => {
          response.end(data);
        });
      } else if (error.errno === -4068) {
        response.statusCode = 403;
        response.end('无权查看目录内容');
      } else {
        response.statusCode = 500;
        response.end('服务器繁忙，请稍候再试');
      }
    } else {
      // 返回 文件内容
      // 添加缓存
      if (pathname.endsWith('.js')) {
        // setHeader 缓存10天
        cacheAge = 3600 * 24 * 10;
      } else if (pathname.endsWith('.css')) {
        // setHeader 缓存20天
        cacheAge = 3600 * 24 * 20;
      }
      response.setHeader('Cache-Control', `public,max-age:${cacheAge}`);
      response.end(data);
    }
  });
});
server.listen(8888);
console.log('hello,you are listening port 8888');
// console.log('hi');
