# koa

**koa-router**

```js
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
router.get('/', async ctx => {});
app
  .use(router.routes()) // 启动路由
  .use(router.allowedMethods()); // 在所有路由中间件最后调用，根据`ctx.status`设置响应头
app.listen(8888);
```

---

**获取 GET 静态路由参数**

```js
// 地址栏输入 http://127.0.0.1:8888/?aid=x1&pwd=123
router.get('/', async ctx => {
  ctx.body = 'Hello koa-router';
  // 获取GET请求参数的方式如下
  ctx.query; // 推荐 [Object: null prototype] { aid: 'x1', pwd: '123' }
  ctx.request.url; // /?aid=x1&pwd=123
  ctx.request.query; // [Object: null prototype] { aid: 'x1', pwd: '123' }
  ctx.request.querystring; // aid=x1&pwd=123
});
```

---

**获取 GET 动态路由参数**

```js
// 地址栏输入 http://127.0.0.1:8888/x1/123
router.get('/:aid/:pwd', async ctx => {
  ctx.params; // { api: 'x1', pwd: '123' }
});
```

---

**中间件**

- 应用级中间件
- 路由中间件
- 错误处理中间件

```js
/**
 * 应用级中间件
 * 匹配全部路由
 */
app.use(async (ctx, next) => {
  console.log('middleware'); // 请求触发，最先打印
  await next(); // 执行对应路由监听回调
});

/**
 * 路由中间件
 */
router.get('/', async (ctx, next) => {
  console.log('/ handler1');
  await next();
});
router.get('/', async ctx => {
  console.log('/ handler2');
  ctx.body = 'Hello koa-router';
});
// next方法按注册顺序执行下一个同名路由处理函数

/**
 * 错误路由中间件
 */
app.use(async (ctx, next) => {
  console.log('middleware');
  await next(); // 执行对应路由监听回调
  // 错误路由处理
  if (ctx.status === 404) {
    console.log('404');
    ctx.body = '404';
  } else {
    console.log(ctx.request.url);
  }
});
```

中间件的执行顺序：`应用级中间件`>`路由中间件`

---

**next 方法**

作用：用于执行下一个处理函数

过程：先从外向内，再从内向外

情景 1：在`app.use`方法中，`next`先执行应用级中间件，最后再路由中间件  
情景 2：在`router.get/post`方法中，同名路由`next`会根据它们注册的先后顺序进行执行

---

**koa-ejs**

`app.js`

```js
// views { (filename: string , option: object) => f }
const views = require('koa-views'); // 依赖 ejs 模块
// 使用 koa-views 中间件 (文件名需使用绝对路径)
app.use(
  views(path.join(__dirname, '../views'), {
    extension: 'ejs' // 模板文件名后缀
  })
);
// 在路由中间件中使用
router.get('/', async (ctx, next) => {
  // 模板数据
  const tmpData = {
    title: 'is title',
    list: ['a', 'b', 'c']
  };
  await ctx.render('index', tmpData); // render 方法由 koa-views 提供
});
```

`index.ejs`

```ejs
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <% include common.ejs %>
    <h2>ejs模板引擎</h2>
    <h3><%= msg %></h3>
    <h3><%= html %></h3>
    <h3><%- html %></h3>
    <ul>
      <% for(let i = 0, l = list.length; i < l; i++) { %>
        <li><%= list[i] %></li>
      <% } %>
    </ul>
  </body>
</html>
```

`common.ejs`

```ejs
<div>common</div>
```

---

**koa-parser**

获取 post 请求参数中间件

```js
const bodyParser = require('koa-bodyparser');

router.post('/login', async (ctx, next) => {
  console.log(ctx.request.body); // `body` 由 `koa-bodyparser` 提供
});

app.use(bodyParser()); // 用于获取 post 请求参数
```

---

**koa-static**

获取静态资源中间件

过程：执行`next`方法，先到指定目录获取静态资源，等待结果返回；通过`response.status`进行错误处理

```js
const path = require('path');
const serve = require('koa-static');
app.use(async (ctx, next) => {
  await next();
  // 错误处理
  if (ctx.response.status === 404) {
    ctx.body = 404;
  }
});
app.use(serve(path.join(__dirname, '../static'))); // 注册静态资源文件夹路径
```

可同时配置多个静态资源文件夹

---

**koa-art-template**

`npm i -S art-template koa-art-template`

```js
const render = require('koa-art-template');
// 配置模板引擎
render(app, {
  root: path.join(__dirname, '../views'),
  extname: '.art',
  debug: process.env.NODE_ENV !== 'production'
});
// 在路由中间件中使用
router.get('/', ctx => {
  const tmpData = {
    title: 'art-template',
    content: '<div>this content</div>'
  };
  await ctx.render('index', tmpData); // render 方法由 art-template 提供
});
```

`index.art`

```art
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{ title }}</title>
</head>
<body>
  <!-- 引入公共模块 -->
  {{ include './common.art' }}

  <!-- 已转义 -->
  {{content}}
  <!-- 未转义 -->
  {{@ content}}
</body>
</html>
```

`common.art`

```art
<div>common</div>
```

---

**koa cookie**

`成员`

- maxAge // 多少毫秒后过期
- expires // 过期的日期
- path // cookie 可访问的路径，默认为'/'
- domain // cookie 域名
- secure // 是否在 https 协议下使用 cookie，默认为 false
- httpOnly // cookie 是否只能在服务器上访问，默认为 true
- overwrite // 是否覆盖同名的 cookie，默认为 false

`api`

- ctx.cookie.set // 设置
- ctx.cookie.get // 获取

注意：koa 中 cookie 默认不能使用中文

`设置中文 cookie`

```js
// 设置前先将中文转 base64
new Buffer('你好世界').toString('base64') // 中文转base64

// 获取后将 base64 转中文
new Buffer('5L2g5aW95LiW55WM', 'base64').toString() // base64转汉字
```

`举个栗子`

```js
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
```

---

**koa-session**

服务端 session 基于 cookie 进行值获取

- key // cookie key 默认为 'koa:sess'
- maxAge // 多少毫秒后过期 【常用】
- autoCommit // 
- overwrite // 是否覆盖同名 cookie，默认为 true
- httpOnly // 是否只有服务器端可获取，默认为 true
- signed // 签名，默认为 true
- rolling // 每次请求都强行设置 cookie，重置过期时间，默认为 false
- renew // 快过期时重新设置 cookie，默认为false 【常用】

```js
const session = require('koa-session');
app.keys = ['some secret hurr']; // cookie 的签名
const CONFIG = {
  key: 'koa:sess',
  maxAge: 5000, // 86400000
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false
};
// 设置 session
router.get('/set', async (ctx, next) => {
  ctx.session.userinfo = 'hello world';
  console.log(ctx.session.userinfo);
  ctx.body = 'SET';
});
// 获取 session
router.get('/get', async (ctx, next) => {
  console.log(ctx.session.userinfo);
  ctx.body = 'GET';
});

app.use(session(CONFIG, app));
```

---

**单例**

```js
class Db {
  // 静态方法
  static getInstance() {
    console.log('instance');
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }
  constructor() {
    console.log('实例化');
    this.connect();
  }
  connect() {
    console.log('连接')
  }
  find() {
    console.log('查询');
  }
}
const db1 = Db.getInstance();
const db2 = Db.getInstance();
db1.find();
db2.find();
```
