const http = require('http');
const url = require('url');
const easyRouter = require('./module/easy-router');
const app = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url);
  if (pathname !== '/favicon.ico') {
    if (pathname === '/') {
      pathname = '/index';
    }
    try {
      const routerName = pathname.slice(1);
      easyRouter[routerName](req, res);
    } catch (err) {
      easyRouter['index'](req, res);
    }
  } else {
    res.end();
  }
});
app.listen(9000);
