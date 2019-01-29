/**
 * login router
 */
const Router = require('koa-router');
const tools = require('../../module/tools');
const DB = require('../../module/db');

const router = new Router();

router.get('/', async (ctx, next) => {
  await ctx.render('admin/login');
});

router.post('/doLogin', async ctx => {
  const { username, password } = ctx.request.body;
  console.log(username, password);
  const flag = { username, password: tools.md5(password) };
  await DB.find('admin', flag).then(res => {
    if (res.length > 0) {
      ctx.session.userinfo = res[0];
      ctx.redirect('/admin/user/list');
    }
  });
  // 验证是否合法

  // 查询数据库获取用户信息
  // ctx.body = '/doLogin' ;
});

module.exports = router.routes();
