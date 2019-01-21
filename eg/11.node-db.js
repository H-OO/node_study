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
    // 增(一条)
    db.collection('test').insertOne(
      {
        name: 'a',
        age: 1
      },
      err => {
        if (err) {
          console.log('error');
          return;
        }
        console.log('success');
        client.close(); // 断开连接
      }
    );
    // // 增(多条)
    // db.collection('test').insertMany(
    //   [
    //     {
    //       name: 'a',
    //       age: 1
    //     },
    //     {
    //       name: 'a',
    //       age: 2
    //     }
    //   ],
    //   err => {
    //     if (err) {
    //       console.log('error');
    //       return;
    //     }
    //     console.log('success');
    //     client.close(); // 断开连接
    //   }
    // );
  }
);
