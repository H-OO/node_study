/**
 * root router
 */
const Router = require('koa-router');
const router = new Router();

const admin = require('./admin');
const api = require('./api');

// 配置路由
router.get('/', async (ctx) => {
  await ctx.render('default/index');
});
router.get('/about', async (ctx) => {
  ctx.body = '关于';
});

// 配置子路由
router.use('/admin', admin);
router.use('/api', api);

module.exports = router;
