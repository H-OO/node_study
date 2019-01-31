/**
 * login router
 */
const Router = require('koa-router');
const tools = require('../../module/tools');
const DB = require('../../module/db');
const svgCaptcha = require('svg-captcha');

const router = new Router();

router.get('/', async (ctx, next) => {
  await ctx.render('admin/login');
});

router.post('/doLogin', async ctx => {
  const { username, password, code } = ctx.request.body;
  // console.log(username, password, code);
  if (code === ctx.session.code) {
    // 验证码通过
    // const flag = { username, password: tools.md5(password) };
    // await DB.find('admin', flag).then(res => {
    //   if (res.length > 0) {
    //     ctx.session.userinfo = res[0];
    //     ctx.redirect('/admin/user/list');
    //   }
    // });
    ctx.redirect('/admin/user/list');
  } else {
    // 验证码失败
    ctx.redirect('/admin/login');
  }
  // 验证是否合法

  // 查询数据库获取用户信息
  // ctx.body = '/doLogin' ;
});

// 验证码
router.get('/code', async (ctx, next) => {
  // create 普通验证码
  // createMathExpr 加法验证码
  const captcha = svgCaptcha.create({
    size: 4,
    fontSize: 50,
    width: 120,
    height: 34,
    background: '#cc9966'
  }); // 生成验证码图
  // captcha.data 图片
  // captcha.text 文本
  // 保存验证码对应文本
  ctx.session.code = captcha.text;
  // 设置响应头
  ctx.response.type = 'image/svg+xml';
  ctx.body = captcha.data;
});

module.exports = router.routes();
