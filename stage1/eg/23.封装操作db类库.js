/**
 * 操作db类库
 * ---
 * 项目启动与运行过程中只连接一次数据库，优化增删改查耗时
 */

const { MongoClient, ObjectID } = require('mongodb');
const dbConfig = require('../dbConfig');

class Db {
  constructor(dbConfig) {
    this.dbConfig = dbConfig; // db配置
    this.connect(); // 提前连接，待使用
  }
  // 静态方法：获取单例
  static getInstance() {
    // 判断实例是否存在
    if (!this.instance) {
      // 不存在则进行第一次初始化
      this.instance = new Db(dbConfig);
    }
    return this.instance;
  }
  // 连接
  connect() {
    const { dbPath, dbName } = this.dbConfig;
    return new Promise((resolve, reject) => {
      // 是否已连接
      if (!this.dbClient) {
        MongoClient.connect(
          dbPath, // 远程路径
          { useNewUrlParser: true }, // 使用新URL字符串解析器
          (err, client) => {
            if (err) {
              reject(err);
            } else {
              const db = client.db(dbName);
              this.dbClient = db;
              resolve(db);
            }
          }
        );
      } else {
        resolve(this.dbClient);
      }
    });
  }
  // 查
  find(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        // 查询
        const cursor = db.collection(collectionName).find(json);
        cursor.toArray((err, arr) => {
          if (err) {
            reject(err);
          } else {
            resolve(arr);
          }
        });
      });
    });
  }
  // 增
  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).insertOne(json, (err, commandResult) => {
          if (err) {
            reject(err);
          } else {
            resolve(commandResult);
          }
        });
      });
    });
  }
  // 删
  delete(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).deleteOne(json, (err, commandResult) => {
          if (err) {
            reject(err);
          } else {
            resolve(commandResult);
          }
        });
      });
    });
  }
  // 改
  update(collectionName, json1, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then(db => {
        db.collection(collectionName).updateOne(
          json1,
          { $set: json2 },
          (err, commandResult) => {
            if (err) {
              reject(err);
            } else {
              resolve(commandResult);
            }
          }
        );
      });
    });
  }
  // 获取 ObjectID
  getObjectID(id) {
    return new ObjectID(id);
  }
}

module.exports = Db.getInstance();

// const Koa = require('koa');
// const Router = require('koa-router');
// const bodyParser = require('koa-bodyparser');
// const render = require('koa-art-template');
// const db = require('./tools/db');

// const app = new Koa();
// const router = new Router();

// router.post('/add', async ctx => {
//   const { name, age } = ctx.request.body;
//   const flag = {
//     name,
//     age: +age
//   };
//   // 操作db
//   db.insert('user', flag).then(cmdRes => {
//     if (cmdRes.result.ok) {
//       console.log('success');
//     } else {
//       console.log('error');
//     }
//   });
// });

// router.post('/remove', async ctx => {
//   const { name, age } = ctx.request.body;
//   const flag = {
//     name,
//     age: +age
//   };
//   db.delete('user', flag).then(cmdRes => {
//     if (cmdRes.result.ok) {
//       console.log('success');
//     } else {
//       console.log('error');
//     }
//   });
// });

// router.post('/edit', async ctx => {
//   const { name, age } = ctx.request.body;
//   const flag = {
//     name
//   };
//   const newData = {
//     age: +age
//   };
//   db.update('user', flag, newData).then(cmdRes => {
//     if (cmdRes.result.ok) {
//       console.log('success');
//     } else {
//       console.log('error');
//     }
//   });
// });

// router.post('/get', async ctx => {
//   // 5c46f938b6f49e26208f5fc3
//   const { name } = ctx.request.body;
//   const flag = {
//     name
//   };
//   // 通过id获取
//   const test = {
//     _id: db.getObjectID('5c46f942b6f49e26208f5fc5')
//   };
//   console.log(test);
//   db.find('user', test)
//     .then(data => {
//       console.log(data);
//     });
// });

// app.use(bodyParser()); // 提供`ctx.request.body`获取请求参数
// app.use(router.routes()).use(router.allowedMethods());

// app.listen(9000);
