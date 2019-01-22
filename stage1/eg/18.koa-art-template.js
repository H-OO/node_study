const path = require('path');
const Koa = require('koa');
const render = require('koa-art-template');

const app = new Koa();

// 配置模板引擎
render(app, {
  root: path.join(__dirname, '../views'),
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
});

// 使用中间件
app.use(async (ctx) => {
  const tmpData = {
    title: 'art-template',
    content: '<div>this content</div>'
  };
  await ctx.render('index', tmpData); // render 方法由 art-template 提供
});

app.listen(9000);
