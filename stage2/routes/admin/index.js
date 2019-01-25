/**
 * admin router
 */
const Router = require('koa-router');
const router = new Router();

// 引入子路由
const user = require('./user');

// admin 全局中间件
router.use(async (ctx, next) => {
  const host = ctx.request.header.host;
  ctx.state._HOST_ = `http://${host}`; // 全局`art-template`变量仓库
  await next();
});

// 配置路由
router.get('/', async (ctx, next) => {
  ctx.body = '首页';
});
router.get('/login', async (ctx, next) => {
  await ctx.render('admin/login');
});

// 配置子路由
router.use('/user', user);

module.exports = router.routes();
