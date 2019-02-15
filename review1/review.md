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
const readStream = fs.createReadStream('test.js');
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
  // no such file or directory
  console.log(err);
});
// --- 写入流
const writeStream = fs.createWriteStream('test.js');
const content = `console.log('Hello World');`;
writeStream.on('finish', () => {
  console.log('写入完成');
});
writeStream.on('error', err => {
  console.log(err);
});
writeStream.write(content);
writeStream.end(); // 标志写入完成，触发`finish`事件
```

### 1.3.4 读写流管道

```js
const fs = require('fs');
// 创建读取流
const readStream = fs.createReadStream('input.js');
const writeStream = fs.createWriteStream('output.js');
readStream.pipe(writeStream); // 读 → 写
```

## 1.4 path 模块

路径拼接

### 1.4.1 举个栗子

- join // 拼接路径，忽略多余`/`
- resolve // 拼接路径

```js
const path = require('path');
// --- join
path.join(__dirname, 'src/') // **/src/
// --- resolve
path.resolve(__dirname, 'src/') // **/src
```

## 1.5 events 模块

异步事件驱动

### 1.5.1 举个栗子

```js
const events = require('events');
const EventEmitter = new events.EventEmitter();
EventEmitter.on('test', data => {
  console.log(data); // { a: '123' }
});
EventEmitter.emit('test', { a: '123' });
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

## 1.3 ejs

模板引擎

### 1.3.1 简单的栗子

- <%=  %> // 赋值语法，转义
- <%-  %> // 赋值语法，不转义
- <%  %> // 编程语法

```js
const http = require('http');
const ejs = require('ejs');
const app = http.createServer((req, res) => {
  ejs.renderFile('statics/index.html', {
    msg: '替换占位符', // 占位符 <%= msg%>
    html: '<h2>HTML片段</h2>' // HTML片段 <%- html %>
  }, (err, data) => {
    if (err) {
      console.log(err);
      return false;
    }
    res.end(data);
  });
});
app.listen(9000);
// --- 编程语法
// <% for (let i = 0; i < 5; i++) { %>
//   <li><%= i %></li>
// <% } %>
```

# 基础知识

## 1.1 静态资源服务

### 1.1.1 举个栗子

```js
// --- index.js
const http = require('http');
const router = require('./module/router');
const app = http.createServer((req, res) => {
  router.statics(req, res, 'statics');
});
app.listen(9000);
// --- router.js
const url = require('url');
const fs = require('fs');
const path = require('path');
const events = require('events');
const EventEmitter = new events.EventEmitter();
const mimeModule = require('./getMime');
exports.statics = function(req, res, staticPath) {
  let { pathname } = url.parse(req.url, true);
  if (pathname !== '/favicon.ico') {
    if (pathname === '/') {
      pathname = '/index.html';
    }
    const extname = path.extname(pathname);
    const filename = path.join(staticPath, pathname);
    fs.readFile(filename, (err, data) => {
      if (err) {
        console.log(err);
        fs.readFile(`${statics}/404.html`, (err, data) => {
          if (err) {
            console.log(err);
            res.write('404');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' });
            res.write(data);
          }
          res.end();
        });
      } else {
        mimeModule.getMime(extname, EventEmitter);
        EventEmitter.on('get_mime', mime => {
          res.writeHead(200, {'Content-Type': `${mime};charset=utf8`});
          // res.write(data); // write after end
          res.end(data);
        });
      }
    });
  } else {
    res.end();
  }
}
// --- getMime.js
const fs = require('fs');
const path = require('path');
exports.getMime = function(extname, EventEmitter) {
  const filename = path.join(__dirname, '../public/mime/mime.json');
  fs.readFile(filename, 'utf-8', (err, dataJSON) => {
    if (err) {
      console.log(err);
    } else {
      const data = JSON.parse(dataJSON);
      EventEmitter.emit('get_mime', data[extname]);
    }
  });
};
```

## 1.2 请求方式

客户端请求服务端的方式

- get
- post

### 1.2.1 获取请求方式

```js
const http = require('http');
const app = http.createServer((req, res) => {
  console.log(req.method); // 获取请求方式
  res.end('请求完成，断开连接');
});
app.listen(9000);
```

### 1.2.2 获取请求参数

```js
// --- get与post请求参数获取
const http = require('http');
const url = require('url');
const app = http.createServer((req, res) => {
  const method = req.method.toLowerCase();
  if (method === 'get') {
    // 假设请求地址为 127.0.0.1:9000?aid=1
    const { query } = url.parse(req.url, true);
    console.log(query); // { aid: '1' }
  } else if (method === 'post') {
    // 假设使用 x-www-form-urlencoded 格式传递参数
    // key | value
    // aid | 1
    // level | 6
    let queryStr = '';
    req.on('data', chunk => {
      queryStr += chunk;
    });
    req.on('end', () => {
      const { query } = url.parse(`?${queryStr}`, true);
      console.log(query); // { aid: '1', level: '6' }
    });
  }
  res.end('请求完成，断开连接');
});
app.listen(9000);
```
