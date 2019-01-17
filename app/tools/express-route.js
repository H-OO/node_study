const url = require('url');

const Server = function() {
  // 注册 get 与 post 接口成员
  // 规则 '/pathname/': f
  Server._get = {};
  Server._post = {};

  // createServer 的回调方法
  const app = function(req, res) {
    // 获取 pathname query method
    const routeInfo = url.parse(req.url, true); // { Url }
    let pathname = routeInfo.pathname; // 路由路径
    const method = req.method.toLowerCase(); // 请求方式字母转小写
    if (pathname !== '/favicon.ico') {
      // 遵循使用规则
      if (!pathname.endsWith('/')) {
        pathname += '/';
      }
      if (Server[`_${method}`][pathname]) {
        if (method === 'get') {
          // get 请求参数获取
          console.log(routeInfo.query);
          Server[`_${method}`][pathname](req, res); // 有请求触发，调用对应的路由回调方法
        } else if (method === 'post') {
          // post 请求参数获取
          let postStr = '';
          req.on('data', chunk => {
            postStr += chunk;
          });
          req.on('end', () => {
            console.log(postStr);
          });
        }
      } else {
        // 无效路由返回 404
        res.end('404');
      }
    }
  };

  // 注册路由回调方法
  app.get = function(pathname, callback) {
    // key 规则 '/pathname/'
    if (!pathname.endsWith('/')) {
      pathname += '/';
    }
    if (!pathname.startsWith('/')) {
      pathname = '/' + pathname;
    }
    Server._get[pathname] = callback; // 注册 get 请求成员
  };
  app.post = function(pathname, callback) {
    // key 规则 '/pathname/'
    if (!pathname.endsWith('/')) {
      pathname += '/';
    }
    if (!pathname.startsWith('/')) {
      pathname = '/' + pathname;
    }
    Server._post[pathname] = callback; // 注册 get 请求成员
  };
  return app;
};

module.exports = Server();

/**
 * ../index.js
 */

// const http = require('http');
// const route = require('./tools/express-route');
// const app = http.createServer(route);

// route.get('/login', (req, res) => {
//   res.end('login');
// });

// app.listen(8888);
