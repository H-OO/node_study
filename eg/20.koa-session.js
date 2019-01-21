const Koa = require('koa');
const Router = require('koa-router');
const session = require('koa-session');

const app = new Koa();
const router = new Router();

app.keys = ['some secret hurr']; // cookie 的签名
const CONFIG = {
  key: 'koa:sess',
  maxAge: 8000, // 86400000
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: true
};

router.get('/set', async (ctx, next) => {
  ctx.session.userinfo = 'hello world';
  console.log(ctx.session.userinfo);
  ctx.body = 'SET';
});

router.get('/get', async (ctx, next) => {
  console.log(ctx.session.userinfo);
  ctx.body = 'GET';
});

app.use(session(CONFIG, app));

app.use(router.routes()).use(router.allowedMethods());

app.listen(9000);
