# nodejs模块

## 1.1 http 模块

监听客户端发送过来的请求

### 1.1.1 简单的栗子

```js
// 引入模块
const http = require('http');
// 创建服务
const server = http.createServer((req, res) => {});
// 监听端口
server.listen(9000);
```

### 1.1.2 写入响应头与响应体

```js
http.createServer((req, res) => {
  // 写入响应头：状态码，文件类型，字符集
  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
  // 写入响应体
  res.write('Hello World');
  // 结束响应，断开连接
  res.end();
});
```

## 1.2 url 模块

方便提取客户端地址栏输入的信息

### 1.2.1 简单的栗子

```js
// 引入模块
const url = require('url');
const http = require('http');
const server = http.createServer((req, res) => {
  // req.url 客户端地址栏输入的信息
  // 假设参数为：?aid=1
  url.parse(req.url, true).query // 处理后可得 {aid: '1'}
  // ...
});
server.listen(9000);
```

## 1.3 fs 模块

文件系统

### 1.3.1 简单的栗子

- stat // 检测是文件还是目录
- mkdir // 创建目录
- writeFile // 创建文件并写入内容
- appendFile // 向已存在的文件追加内容
- readFile // 读取文件
- readdir // 读取目录
- rename // 重命名
- rmdir // 删除目录
- unlink // 删除文件

```js
const fs = require('fs');
// --- stat
fs.stat('./x.js', (err, stats) => {
  if (err) {
    console.log(err);
    return false;
  }
  if (stats.isDirectory()) {
    // 目录
  } else {
    // 文件
  }
});

// --- mkdir
fs.mkdir('./isDir', (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log('创建完成');
})
// --- writeFile
const msg = {
  a: '123'
};
fs.writeFile('./msg.log', JSON.stringify(msg), err => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log('创建并写入完成');
});
// --- appendFile
fs.appendFile('./msg.log', '\n// end', (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log('追加完成');
})
// --- readFile
fs.readFile('./test.js', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log('读取完成');
  console.log(data);
})
// --- rename
fs.rename('./test.js', './t/t.js', err => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log('重命名并剪切完成');
})
// --- rmdir
fs.rmdir('./t', err => {
  if (err) {
    // no such file or directory 目录不存在则删除失败
    // directory not empty 目录非空则删除失败
    console.log(err);
    return false;
  }
  console.log('删除目录完成');
});
// --- unlink
fs.unlink('./t/t.js', err => {
  if (err) {
    // no such file or directory 文件不存在则删除失败
    console.log(err);
    return false;
  }
  console.log('删除文件完成');
});
```

### 1.3.2 递归打印目录结构

```js
// logDir.js
const fs = require('fs');
class LogDir {
  constructor(dirName) {
    this.level = 0;
    this.read(dirName);
  }
  read(dirName) {
    try {
      const members = fs.readdirSync(dirName);
      const len = members.length - 1;
      members.forEach((member, i) => {
        const filename = `${dirName}/${member}`;
        const stats = fs.statSync(filename);
        if (stats.isDirectory()) {
          if (i !== len) {
            console.log(`${'   '.repeat(this.level)}┣━ ${member}`);
          } else {
            console.log(`${'   '.repeat(this.level)}┗━ ${member}`);
          }
          this.level++;
          this.read(filename);
        } else {
          if (i !== len) {
            console.log(`${'   '.repeat(this.level)}┣━ ${member}`);
          } else {
            console.log(`${'   '.repeat(this.level)}┗━ ${member}`);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = LogDir;

// use
const LogDir = require('./module/logDir');
new LogDir('./src/b');
```

### 1.3.3 创建读写流

- createReadStream // 读取流
- createWriteStream // 写入流

```js
const fs = require('fs');
// --- 读取流
const readStream = fs.createReadStream('test.txt');
let content = ''; // 内容
let count = 0; // 次数
readStream.on('data', chunk => {
  content += chunk;
  count++;
});
readStream.on('end', () => {
  console.log(content);
  console.log(count);
});
readStream.on('error', err => {
  console.log(err);
});
// --- 写入流

```

# 第三方模块

## 1.1 md5-node

md5加密，不可逆

### 1.1.1 简单的栗子

```js
const md5 = require('md5-node');
md5('123456') // e10adc3949ba59abbe56e057f20f883e
```

## 1.2 silly-datetime

日期格式化

### 1.2.1 简单的栗子

```js
const sd = require('silly-datetime');
sd.format(new Date(), 'YYYY-MM-DD') // 1970-01-01
```


