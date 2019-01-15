const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const mimeJSON = require('../static/mime.json');
const app = http.createServer((req, res) => {
  const { url: _url } = req;
  let { pathname } = url.parse(_url); // 只获取pathname部分
  // console.log(pathname);
  if (pathname === '/') {
    pathname = '/index.html';
  }
  if (pathname !== '/favicon.ico') {
    // 拼接请求路径
    const filename = path.join(__dirname, '../static', pathname);
    // 异步读取文件
    fs.readFile(filename, (err, data) => {
      // 错误路径调用404页面
      if (err) {
        const err404 = path.join(__dirname, '../static/404.html');
        fs.readFile(err404, (err, data) => {
          if (err) throw err;
          res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
          res.write(data);
          res.end();
        });
        return;
      }
      // 根据文件后缀名动态写入响应头
      const extname = path.extname(pathname); // 获取后缀名
      let contentType = mimeJSON[extname]; // 获取mime
      // 写入请求头
      res.writeHead(200, { 'Content-Type': `${contentType};charset=utf-8`});
      // 写入响应体
      res.write(data);
      // 结束
      res.end();
    });
  }
});

app.listen(8888);
