# MongoDB

**数据库**

| 数据库名 | 表(集合collections) |                成员                 |
| :------: | :-----------------: | :---------------------------------: |
|          |        admin        | {"_id" :ObjectId("1"), "name": "a"} |
|   data   |       config        | {"_id" :ObjectId("2"), "name": "b"} |
|          |        local        | {"_id" :ObjectId("3"), "name": "c"} |

---

**命令**

- mongod --dbpath '' // 开启 db 服务
- mongo // 连接本地服务
- mongo 127.0.0.1:27017 // 连接远程服务
- show dbs // 查看所有数据库列表

---

**创建表**

- use user // 使用`user`表(不存在则创建空表，无数据暂不可查)
- db.user.insert() // 创建`user`表并插入数据，数据格式为json (插入数据后表可查)
- show collections // 查看当前数据库中的表

---

**查找数据**

- db.user.find() // 查询`user`表中的全部数据
  
```db
// 假设`user`表中已有的数据如下
{ "_id" : ObjectId("5c402ce189d8c0cf3f10364c"), "name" : "a", "age" : 1, "sex" : "♂" }
{ "_id" : ObjectId("5c402d0589d8c0cf3f10364d"), "name" : "aa", "age" : 2, "sex" : "♂" }
{ "_id" : ObjectId("5c402d1289d8c0cf3f10364e"), "name" : "aaa", "age" : 3, "sex" : "♂" }
{ "_id" : ObjectId("5c402d4989d8c0cf3f10364f"), "name" : "b", "age" : 4, "sex" : "♀" }
{ "_id" : ObjectId("5c402d5189d8c0cf3f103650"), "name" : "bb", "age" : 5, "sex" : "♀" }
{ "_id" : ObjectId("5c402d5989d8c0cf3f103651"), "name" : "bbb", "age" : 6, "sex" : "♀" }
{ "_id" : ObjectId("5c402d7c89d8c0cf3f103652"), "name" : "c", "age" : 1, "sex" : "♀" }
{ "_id" : ObjectId("5c402d8b89d8c0cf3f103653"), "name" : "cc", "age" : 3, "sex" : "♀" }
{ "_id" : ObjectId("5c402d9189d8c0cf3f103654"), "name" : "ccc", "age" : 5, "sex" : "♀" }
{ "_id" : ObjectId("5c402d9f89d8c0cf3f103655"), "name" : "d", "age" : 2, "sex" : "♂" }
{ "_id" : ObjectId("5c402da689d8c0cf3f103656"), "name" : "dd", "age" : 4, "sex" : "♂" }
{ "_id" : ObjectId("5c402dac89d8c0cf3f103657"), "name" : "ddd", "age" : 6, "sex" : "♂" }

// 全部查找
db.user.find()

// 精确查找
db.user.find({"age": 2}) // 【查找字段"age"为 2 的数据】
// ↓
{ "_id" : ObjectId("5c402d0589d8c0cf3f10364d"), "name" : "aa", "age" : 2, "sex" : "♂" }
{ "_id" : ObjectId("5c402d9f89d8c0cf3f103655"), "name" : "d", "age" : 2, "sex" : "♂" }

// 范围查找
// ---
db.user.find({"age": {$gt:5}}) // 【查找字段"age"大于 5 的数据】
// ↓
{ "_id" : ObjectId("5c402d5989d8c0cf3f103651"), "name" : "bbb", "age" : 6, "sex" : "♀" }
{ "_id" : ObjectId("5c402dac89d8c0cf3f103657"), "name" : "ddd", "age" : 6, "sex" : "♂" }
// ---
db.user.find({"age": {$lt:2}}) // 【查找字段"age"小于 2 的数据】
// ↓
{ "_id" : ObjectId("5c402ce189d8c0cf3f10364c"), "name" : "a", "age" : 1, "sex" : "♂" }
{ "_id" : ObjectId("5c402d7c89d8c0cf3f103652"), "name" : "c", "age" : 1, "sex" : "♀" }
// ---
db.user.find({"age": {$gte: 5}}) // 【查找字段"age"大于等于 5 的数据】
// ↓
{ "_id" : ObjectId("5c402d5189d8c0cf3f103650"), "name" : "bb", "age" : 5, "sex" : "♀" }
{ "_id" : ObjectId("5c402d5989d8c0cf3f103651"), "name" : "bbb", "age" : 6, "sex" : "♀" }
{ "_id" : ObjectId("5c402d9189d8c0cf3f103654"), "name" : "ccc", "age" : 5, "sex" : "♀" }
{ "_id" : ObjectId("5c402dac89d8c0cf3f103657"), "name" : "ddd", "age" : 6, "sex" : "♂" }
// ---
db.user.find({"age": {$lte: 2}}) // 【查找字段"age"小于等于 2 的数据】
// ↓
{ "_id" : ObjectId("5c402ce189d8c0cf3f10364c"), "name" : "a", "age" : 1, "sex" : "♂" }
{ "_id" : ObjectId("5c402d0589d8c0cf3f10364d"), "name" : "aa", "age" : 2, "sex" : "♂" }
{ "_id" : ObjectId("5c402d7c89d8c0cf3f103652"), "name" : "c", "age" : 1, "sex" : "♀" }
{ "_id" : ObjectId("5c402d9f89d8c0cf3f103655"), "name" : "d", "age" : 2, "sex" : "♂" }
// ---
db.user.find({"age": {$gte:3, $lte:4}}) // 【查找字段"age"大于等于 3 小于等于 4 的数据】
// ↓
{ "_id" : ObjectId("5c402d1289d8c0cf3f10364e"), "name" : "aaa", "age" : 3, "sex" : "♂" }
{ "_id" : ObjectId("5c402d4989d8c0cf3f10364f"), "name" : "b", "age" : 4, "sex" : "♀" }
{ "_id" : ObjectId("5c402d8b89d8c0cf3f103653"), "name" : "cc", "age" : 3, "sex" : "♀" }
{ "_id" : ObjectId("5c402da689d8c0cf3f103656"), "name" : "dd", "age" : 4, "sex" : "♂" }

// 正则查找
db.user.find({"name": /^a/})
// ↓
{ "_id" : ObjectId("5c402ce189d8c0cf3f10364c"), "name" : "a", "age" : 1, "sex" : "♂" }
{ "_id" : ObjectId("5c402d0589d8c0cf3f10364d"), "name" : "aa", "age" : 2, "sex" : "♂" }
{ "_id" : ObjectId("5c402d1289d8c0cf3f10364e"), "name" : "aaa", "age" : 3, "sex" : "♂" }

// 指定列查找
db.user.find({"age": {$lt:2}}, {"sex": 1})
// ↓
{ "_id" : ObjectId("5c402ce189d8c0cf3f10364c"), "sex" : "♂" }
{ "_id" : ObjectId("5c402d7c89d8c0cf3f103652"), "sex" : "♀" }

// 排序
db.user.find({"age": {$lt:3}}).sort({"age": 1}) // 1 表示升序，-1 表示降序
// ↓
{ "_id" : ObjectId("5c402ce189d8c0cf3f10364c"), "name" : "a", "age" : 1, "sex" : "♂" }
{ "_id" : ObjectId("5c402d7c89d8c0cf3f103652"), "name" : "c", "age" : 1, "sex" : "♀" }
{ "_id" : ObjectId("5c402d0589d8c0cf3f10364d"), "name" : "aa", "age" : 2, "sex" : "♂" }
{ "_id" : ObjectId("5c402d9f89d8c0cf3f103655"), "name" : "d", "age" : 2, "sex" : "♂" }

// 查找前几条
db.user.find().limit(2)
// ↓
{ "_id" : ObjectId("5c402ce189d8c0cf3f10364c"), "name" : "a", "age" : 1, "sex" : "♂" }
{ "_id" : ObjectId("5c402d0589d8c0cf3f10364d"), "name" : "aa", "age" : 2, "sex" : "♂" }

// 跳过前几条查找
db.user.find().skip(10)
// ↓
{ "_id" : ObjectId("5c402da689d8c0cf3f103656"), "name" : "dd", "age" : 4, "sex" : "♂" }
{ "_id" : ObjectId("5c402dac89d8c0cf3f103657"), "name" : "ddd", "age" : 6, "sex" : "♂" }

// 查询第一条数据
db.user.findOne()
// ↓
{ "_id" : ObjectId("5c402ce189d8c0cf3f10364c"), "name" : "a", "age" : 1, "sex" : "♂" }

// 或
db.user.find({$or: [{"age": 2}, {"age": 4}]})
// ↓
{ "_id" : ObjectId("5c402d0589d8c0cf3f10364d"), "name" : "aa", "age" : 2, "sex" : "♂" }
{ "_id" : ObjectId("5c402d4989d8c0cf3f10364f"), "name" : "b", "age" : 4, "sex" : "♀" }
{ "_id" : ObjectId("5c402d9f89d8c0cf3f103655"), "name" : "d", "age" : 2, "sex" : "♂" }
{ "_id" : ObjectId("5c402da689d8c0cf3f103656"), "name" : "dd", "age" : 4, "sex" : "♂" }

// 数据条数
db.user.find().count() // 12
```

---

**删除数据库或表**

- db.dropDatabase() // 删除当前所在数据库
- db.user.drop() // 删除`user`表

---

**修改数据**

- db.goods.update() // 参数1为查找的目标，参数2为目标要修改的字段

注意：不使用第二个参数为直接替换

```
// 假设`goods`表中的数据如下
{ "_id" : ObjectId("5c40489689d8c0cf3f103659"), "name" : "a", "price" : 888 }

// 修改字段"price"的值
db.goods.update({"name": "a"}, {$set: {"price": 666}})
// ↓
{ "_id" : ObjectId("5c40489689d8c0cf3f103659"), "name" : "a", "price" : 666 }
```

---

**删除数据**

- db.goods.deleteMany() // 删除全部匹配条数
- db.goods.deleteOne() // 只删除一条

```
// 假设`goods`表中的数据如下
{ "_id" : ObjectId("5c40489689d8c0cf3f103659"), "name" : "a", "price" : 666 }
{ "_id" : ObjectId("5c404e1a89d8c0cf3f10365a"), "name" : "b", "price" : 777 }
{ "_id" : ObjectId("5c404ed289d8c0cf3f10365c"), "name" : "c", "price" : 888 }
{ "_id" : ObjectId("5c404edb89d8c0cf3f10365d"), "name" : "a", "price" : 999 }

// 删除
// ---
db.goods.deleteMany({"name": "a"}) // 删除所有字段"name"为"a"的数据
// ↓
{ "_id" : ObjectId("5c404e1a89d8c0cf3f10365a"), "name" : "b", "price" : 777 }
{ "_id" : ObjectId("5c404ed289d8c0cf3f10365c"), "name" : "c", "price" : 888 }
// ---
db.goods.deleteOne({"name": "a"}) // 仅删除一个字段"name"为"a"的数据
// ↓
{ "_id" : ObjectId("5c404e1a89d8c0cf3f10365a"), "name" : "b", "price" : 777 }
{ "_id" : ObjectId("5c404ed289d8c0cf3f10365c"), "name" : "c", "price" : 888 }
{ "_id" : ObjectId("5c404edb89d8c0cf3f10365d"), "name" : "a", "price" : 999 }
```

---

**索引和 explain的使用**
