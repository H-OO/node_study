const path = require('path');
const Koa = require('koa');
const render = require('koa-art-template');
const router = require('./routes');
const app = new Koa();

// 配置模板引擎
// 为`ctx`提供了`render`方法，接收文件名
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
});

// 启动路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(9000);
