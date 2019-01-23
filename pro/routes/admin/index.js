/**
 * admin router
 */
const Router = require('koa-router');
const router = new Router();

// 引入子路由
const user = require('./user');

// 配置路由
router.get('/', async (ctx, next) => {
  ctx.body = '首页';
});

// 配置子路由
router.use('/user', user);

module.exports = router.routes();
