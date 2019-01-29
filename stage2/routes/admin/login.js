/**
 * login router
 */
const Router = require('koa-router');
const router = new Router();

router.get('/login', async (ctx, next) => {
  await ctx.render('/login');
});

router.post('/dologin', async (ctx) => {
  console.log(ctx.url);
});

module.exports = router.routes();
