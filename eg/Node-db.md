# Node 与 db

**连接**

- npm i -S mongodb // 安装模块
- const { MongoClient } = require('mongodb'); // 引入模块
- const url = 'mongodb://127.0.0.1:27017/dev'; // 数据库远程地址，dev 表示数据库名称
- MongoClient.connect(url, (err, db) => {}) // 连接数据库

```js
const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'dev';
MongoClient.connect(
  url,
  {
    useNewUrlParser: true
  },
  (err, client) => {
    if (err) throw err;
    const db = client.db(dbName);
    // 通过 `db` 进行增删改查
    // client.close(); // 操作完成断开连接
  }
);
```

---

**增删改查**

- db.collection('user').insert[One|Many]() // 增，在`user`表中插入[一条|多条]数据
- db.collection('user').delete[One|Many]() // 删，在`user`表中删除[一条|多条]数据
- db.collection('user').update[One|Many]() // 改，在`user`表中修改[一条|多条]数据
- db.collection('user').find() // 查，查询`user`中匹配的数据

举个栗子

```js
// 增(一条)
db.collection('test').insertOne(
  {
    name: 'a',
    age: 1
  },
  (err, commandResult) => {
    if (err) {
      console.log('error');
      return;
    }
    console.log('success');
    client.close(); // 断开连接
  }
);

// 增(多条)
db.collection('test').insertMany(
  [
    {
      name: 'a',
      age: 1
    },
    {
      name: 'a',
      age: 2
    }
  ],
  (err, commandResult) => {
    if (err) {
      console.log('error');
      return;
    }
    console.log('success');
    client.close(); // 断开连接
  }
);

// 改
db.collection('test').updateOne({name: 'a'}, { $set: {age: 1} }, (err, commandResult) => {
  if (err) {
    console.log('error');
    return;
  }
  console.log('success');
  client.close(); // 断开连接
});

// 通过ObjectID获取数据
const { MongoClient, ObjectID } = require('mongodb');
db.collection('test').find({_id: ObjectID('5c46f942b6f49e26208f5fc5')})
```
