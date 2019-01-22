const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// handler 1
router.get('/', async (ctx, next) => {
  console.log('handler1');
  await next();
});
// handler 2
router.get('/', async (ctx) => {
  console.log('handler2');
  ctx.body = 'Hello koa-router';
});
// next方法按注册顺序执行下一个同名路由处理函数

// 匹配全路由，当请求触发时优先执行
// middleware1
app.use(async (ctx, next) => {
  console.log('middleware1');
  await next(); // 执行对应路由监听回调
  console.log('middleware1 end');
});
// middleware2
app.use(async (ctx, next) => {
  console.log('middleware2');
  await next(); // 执行对应路由监听回调
  console.log('middleware2 end');
  // 错误路由处理
  if (ctx.status === 404) {
    console.log('404');
    ctx.body = '404';
  } else {
    console.log(ctx.request.url);
  }
});
app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods()) // 在所有路由中间件最后调用，根据`ctx.status`设置响应头

// 监听
app.listen(8888);
