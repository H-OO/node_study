const Router = require('koa-router');
const router = new Router();

// 配置路由
router.get('/list', async (ctx, next) => {
  await ctx.render('admin/user/list');
});
router.get('/add', async (ctx, next) => {
  await ctx.render('admin/user/add');
});

module.exports = router.routes();
