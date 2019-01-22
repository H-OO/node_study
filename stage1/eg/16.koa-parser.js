const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

router.post('/login', async (ctx, next) => {
  console.log(ctx.request.body); // `body` 由 `koa-bodyparser` 提供
});

app.use(bodyParser()); // 用于获取 post 请求参数
app.use(router.routes()).use(router.allowedMethods());

app.listen(9000);
