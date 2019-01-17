const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const app = http.createServer((req, res) => {
  const { url: _url, method } = req;
  const address = url.parse(_url); // url字符串转对象
  const reqMethod = method.toLowerCase(); // 请求方式
  let { pathname, query } = address;
  // 获取pathname作为路由地址
  if (pathname === '/') {
    pathname = '/index';
  }
  if (pathname !== '/favicon.ico') {
    switch (pathname) {
      // 登录页
      case '/login':
        const filename = path.join(__dirname, `../static${pathname}.html`); // 根据路由生成文件路径
        // 读取文件
        fs.readFile(filename, (err, data) => {
          if (err) throw err;
          res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
          });
          res.write(data);
          res.end();
        });
        break;
      // 登录操作
      case '/tologin':
        let user = '';
        // 获取get请求参数
        if (reqMethod === 'get') {
          user = JSON.stringify(query) + '\n';
          fs.appendFile(
            path.join(__dirname, '../static/login.txt'),
            user,
            (err, data) => {
              if (err) throw err;
              res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
              });
              res.end('登录成功');
              console.log('写入成功..');
            }
          );
        } else if (reqMethod === 'post') {
          // 获取post请求参数
          req.on('data', chunk => {
            user += chunk;
          })
          req.on('end', () => {
            user += '\n';
            fs.appendFile(
              path.join(__dirname, '../static/login.txt'),
              user,
              (err, data) => {
                if (err) throw err;
                res.writeHead(200, {
                  'Content-Type': 'text/html;charset=utf-8'
                });
                res.end('登录成功');
                console.log('写入成功..');
              }
            );
          });
        }
        break;
    }
  }
});

app.listen(8888);
