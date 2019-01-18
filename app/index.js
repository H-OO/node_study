const Koa = require('koa');
// 实例化
const app = new Koa();

// 使用中间件
app.use(async (ctx) => {
  ctx.body = 'Hello koa2.x';
});

// 监听
app.listen(8888);
