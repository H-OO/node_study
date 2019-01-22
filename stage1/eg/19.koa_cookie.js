const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/set', async (ctx, next) => {
  const userinfo = new Buffer('你好世界').toString('base64'); // 汉字 cookie
  ctx.cookies.set('userinfo', userinfo, {
    maxAge: 60 * 1000 * 60 // 多少毫秒后过期
  });
});

router.get('/get', async (ctx, next) => {
  const userinfoBase64 = ctx.cookies.get('userinfo');
  const userinfo = new Buffer(userinfoBase64, 'base64').toString();
  console.log(userinfo); // 你好世界
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(9000);
