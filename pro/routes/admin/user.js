const Router = require('koa-router');
const router = new Router();

// 配置路由
router.get('/', async (ctx, next) => {
  await ctx.render('admin/user/index');
});
router.get('/get', async (ctx, next) => {
  await ctx.render('admin/user/get');
});
router.get('/add', async (ctx, next) => {
  ctx.body = 'add user';
});
router.get('/remove', async (ctx, next) => {
  ctx.body = 'remove user';
});
router.get('/edit', async (ctx, next) => {
  ctx.body = 'edit user';
});

module.exports = router.routes();
