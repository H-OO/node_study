const Koa = require('koa');
const Router = require('koa-router');
const views = require('koa-views');
const path = require('path');
const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  const tmpData = {
    title: 'hello world',
    list: ['A', 'B', 'C']
  };
  await ctx.render('index', tmpData); // render 方法由 koa-views 提供
});

// 使用 koa-views 中间件 (文件名需使用绝对路径)
app.use(views(path.join(__dirname, '../views'), {
  extension: 'ejs'
}));

app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods()) // 在所有路由中间件最后调用，根据`ctx.status`设置响应头

app.listen(8888);
