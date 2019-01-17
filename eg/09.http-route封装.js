const fs = require('fs');
const path = require('path');
const url = require('url');
const ejs = require('ejs');
const getMime = require('./getMime');
const routeHander = {
  index(req, res) {
    console.log('index handler');
  },
  login(req, res) {
    console.log('__login handler__');
    const filename = path.join(__dirname, '../../static/login.ejs');
    // 获取 login 模板页
    ejs.renderFile(filename, {}, (err, data) => {
      if (err) throw err;
      const extname = path.extname(filename);
      // 获取 mime 类型，动态设置响应头
      getMime(extname, mime => {
        res.writeHead(200, {
          'Content-Type': `${mime};charset=utf-8`
        });
        res.write(data); // 返回 login 界面
        res.end();
      });
    });
  },
  join(req, res) {
    console.log('join handler');
  },
  tologin(req, res) {
    console.log('tologin handler');
    const method = req.method.toLowerCase(); // 请求方式
    if (method === 'get') {
      console.log('__GET__');
      // get 请求参数获取
      const { query } = url.parse(req.url, true);
      const { username, password } = query;
      console.log(username, password);
    } else if (method === 'post') {
      console.log('__POST__');
      // post 请求参数获取
      let query = '';
      const params = {};
      req.on('data', chunk => {
        query += chunk;
      });
      req.on('end', () => {
        query.split('&').forEach(item => {
          const member = item.split('=');
          const key = member[0];
          const value = member[1];
          params[key] = value;
        });
        const { username, password } = params;
        console.log(username, password);
      });
    }
  }
};

module.exports = routeHander;

/**
 * ../index.js
 */
// const http = require('http');
// const url = require('url');
// const httpRoute = require('./tools/http-route');

// const app = http.createServer((req, res) => {
//   const urlInfo = url.parse(req.url, true);
//   let pathname = urlInfo.pathname.slice(1);
//   // 路由 / 等同于 /index
//   if (pathname.length === 0) {
//     pathname = 'index';
//   }
//   if (pathname !== 'favicon.ico') {
//     try {
//       httpRoute[pathname](req, res);
//     } catch (err) {
//       console.log('404');
//     }
//   }
// });

// app.listen(8888);
