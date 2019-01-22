/**
 * api router
 */
const Router = require('koa-router');
const router = new Router();

// 配置路由
router.get('/', async (ctx, next) => {
  ctx.body = {title: 'api'}
});

module.exports = router.routes();
