const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');

const app = new Koa();
const router = new Router;

app.use(async (ctx, next) => {
  await next();
  // 错误处理
  if (ctx.response.status === 404) {
    ctx.body = 404;
    console.log('404');
  } else {
    console.log('success');
  }
});

app.use(serve(path.join(__dirname, '../static'))); // 注册静态资源文件夹路径

app.use(router.routes()).use(router.allowedMethods);

app.listen(9000);
