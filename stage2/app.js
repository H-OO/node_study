const path = require('path');
const Koa = require('koa');
const render = require('koa-art-template');
const serve = require('koa-static');
const router = require('./routes');
const app = new Koa();

// session
const session = require('koa-session');
app.keys = ['some secret hurr']; // cookie 的签名
const CONFIG = {
  key: 'koa:sess',
  maxAge: 864000, // 过期时间
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: true, // 每次请求都重新设置session
  renew: false
};

// 配置模板引擎
// 为`ctx`提供了`render`方法，接收文件名
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

// 应用级中间件
app.use(async (ctx, next) => {
  await next();
  // 错误处理
  if (ctx.response.status === 404) {
    ctx.body = 404;
  }
});

// session
app.use(session(CONFIG, app));
// 注册静态资源文件夹路径
app.use(serve(path.join(__dirname, 'public')));
// 启动路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(9000);
