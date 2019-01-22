const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 监听
router.get('/', async (ctx) => {
  console.log(ctx);
  ctx.body = 'Hello koa-router';
});

app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods()) // 在所有路由中间件最后调用，根据`ctx.status`设置响应头

// 监听
app.listen(8888);
