const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const render = require('koa-art-template');
const db = require('./tools/db');

const app = new Koa();
const router = new Router();

router.post('/add', async ctx => {
  const { name, age } = ctx.request.body;
  const flag = {
    name,
    age: +age
  };
  // 操作db
  db.insert('user', flag).then(cmdRes => {
    if (cmdRes.result.ok) {
      console.log('success');
    } else {
      console.log('error');
    }
  });
});

router.post('/remove', async ctx => {
  const { name, age } = ctx.request.body;
  const flag = {
    name,
    age: +age
  };
  db.delete('user', flag).then(cmdRes => {
    if (cmdRes.result.ok) {
      console.log('success');
    } else {
      console.log('error');
    }
  });
});

router.post('/edit', async ctx => {
  const { name, age } = ctx.request.body;
  const flag = {
    name
  };
  const newData = {
    age: +age
  };
  db.update('user', flag, newData).then(cmdRes => {
    if (cmdRes.result.ok) {
      console.log('success');
    } else {
      console.log('error');
    }
  });
});

router.post('/get', async ctx => {
  // 5c46f938b6f49e26208f5fc3
  const { name } = ctx.request.body;
  const flag = {
    name
  };
  // 通过id获取
  const test = {
    _id: db.getObjectID('5c46f942b6f49e26208f5fc5')
  };
  console.log(test);
  db.find('user', test)
    .then(data => {
      console.log(data);
    });
});

app.use(bodyParser()); // 提供`ctx.request.body`获取请求参数
app.use(router.routes()).use(router.allowedMethods());

app.listen(9000);