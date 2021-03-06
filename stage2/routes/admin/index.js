/**
 * admin router
 */
const url = require('url');
const Router = require('koa-router');
const router = new Router();

// 引入子路由
const user = require('./user');
const login = require('./login');

// admin 全局中间件
router.use(async (ctx, next) => {
  const host = ctx.request.header.host;
  ctx.state._HOST_ = `http://${host}`; // 全局`art-template`变量仓库
  if (ctx.session.userinfo) {
    console.log('用户已登录');
    await next(); // 向下匹配路由
  } else {
    console.log('用户未登录');
    const { pathname } = url.parse(ctx.url); // 获取路由地址
    if (
      pathname !== '/admin/login' &&
      pathname !== '/admin/login/doLogin' &&
      pathname !== '/admin/login/code'
    ) {
      ctx.redirect('/admin/login');
    } else {
      await next();
    }
  }
});

// 配置路由
router.get('/', async (ctx, next) => {
  ctx.body = '首页';
});

// 配置子路由
router.use('/user', user);
router.use('/login', login);

module.exports = router.routes();
