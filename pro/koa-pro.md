# koa-pro

**第三方类库**

- mongodb
- koa
- koa-router
- koa-bodyparser
- koa-art-template | art-template
- koa-views | ejs
- koa-session
- koa-static

---

**路由模块化**

```js
/**
 * api.js
 */
const Router = require('koa-router');
const router = new Router();
// 配置路由
router.get('/', async () => {});
module.exports = router.routes();
/**
 * app.js
 */
const Koa = require('koa');
const Router = require('koa-router');
const api = require('./api');
const app = new Koa();
const router = new Router();
// 通过 router.use 方法配置子路由
router.use('/api', api);
// 启动路由
app.use(router.routes()).use(router.allowedMethods());
// 监听端口
app.listen(9000);
```
