class Db {
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

console.log('===');
const db1 = Db.getInstance();
const db2 = Db.getInstance();
db1.find();
db2.find();
