# Node

**http**

- createServer // 创建服务

举个栗子

```js
const http = require('http');
// 创建服务
const app = http.createServer((req, res) => {
  /**
   * @arguments req 获取URL信息
   * @arguments res 响应信息
   */

  // writeHead { (code: number, msg: object) => void }
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8'
  }); // 设置HTTP头部，状态码

  // write { (content: string) => void }
  res.write('Hello world'); // 写入响应体

  // end { () => void }
  res.end(); // 结束响应
});
// 监听端口
app.listen(8888);
```

---

**url**

- parse // url 字符串转对象
- format // url 对象转字符串
- resolve // 替换最后一层路径

```js
// parse { (url: string, serialized?: boolean = false) => Url }
// format { (url: Url) => string }
// resolve { (from: string, to: string) => string }
```

---

**commonJs**

模块导出与导入

```js
// todo.js
function todo() {}
module.exports = todo; // 模块导出

// app.js(与todo.js文件同级)
const todo = require('./todo.js'); // 模块导入(相对路径)
```

只写模块名导入，模块的查找顺序如下：

```js
const todo = require('todo'); // 模块导入(只写模块名)
// 先在根目录下查找
// → node_modules 查找对应文件夹 todo
// → 在该文件夹下查找入口文件 package.json
// → 入口文件 "main": "todo.js"
```

---

**npm 命令**

- -v // 查看版本
- install [-D|-S|-g] `ModuleName` // 安装包
- uninstall [-D|-S|-g] `ModuleName` // 卸载包
- npm list // 查看已安装的 node 包列表
- npm info `ModuleName` // 查看包的其他版本
- npm install `ModuleName`@x.y.z // 指定版本安装

---

**fs**

- stat // 检测是文件还是目录
- mkdir // 创建目录
- writeFile // 创建并写入文件，默认格式为 utf-8
- appendFile // 内容追加文件
- readFile // 读取文件，默认读取格式为 Buffer
- readDir // 读取目录
- rename // 重命名或移动文件
- rmdir // 删除目录
- unlink // 删除文件
- createReadStream // 创建读取流(提供事件监听进行文件的多次读取)
- createWriteStream // 创建写入流(能创建文件但不能创建文件夹)

```js
const fs = require('fs');
// rename { (from: string, to: string, callback: () => void) => void }

// createReadStream { (filename: string) => ReadStream }
const readStream = fs.createReadStream('./Node.md');
// 文件过大时会多次读取，防止阻塞
readStream.on('data', (chunk) => {
  console.log(chunk);
});
// 读取结束
readStream.on('end', () => {
  console.log('end');
})

// createWriteStream { (filename: string) => WriteStream }
const writeStream = fs.createWriteStream('./output.txt');
const data = 'test';
writeStream.write(data, 'utf-8'); // 写入操作
writeStream.end(); // 标记写入完成，才可监听 finish 事件
// 写入完成回调
writeStream.on('finish', () => {
  console.log('写入完成..');
});
// 写入失败回调
writeStream.on('error', () => {
  console.log('写入失败..');
});

// ReadStream.pipe { (writeStream: WriteStream) => void }
const readStream = fs.createReadStream('./Node.md');
const writeStream = fs.createWriteStream('./output.txt');
readStream.pipe(writeStream); // 读取文件流通过管道写入文件流
```

---

**第三方包**

- md5-node // md5
- silly-datetime // 日期格式化

```js
// md5-node
const md5 = require('md5-node');
console.log(md5('123'));

// silly-datetime
const sd = require('silly-datetime');
console.log(sd.format(new Date(), 'YYYY-MM-DD'));
```
