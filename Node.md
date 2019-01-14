# Node

Node 是一个平台，是它选择了 JS 并为其提供 API，让 JS 能进行后台开发

**概念**

- 回调函数，错误优先
- 异步 // 网络操作或磁盘操作
- I/O // input/output
- 非阻塞机制 // 耗时事件都先放入`事件队列`等待`Event Loop`去执行，触发回调
- 异步操作无法通过`try-catch`语句捕获异常
- thread poolth // 线程池，Node 将阻塞操作交给内部维护的线程池
- Node 主线程通过不断调度实现非阻塞
- 所有的文件操作必须是绝对路径
- 一个 js 文件就是一个模块
- 模块需要有输出
- 模块内部是一个独立作用域，模块与模块之间互不影响
- 读取文件时没有指定编码默认读取的是一个 Buffer(缓冲区 )

---

**process**

- argv // 获取命令行参数
- stdin // 标准输入
- stdout // 标准输出

---

**fs**

- stat // 检查文件是否存在
- writeFile // 创建文件
- unlink // 删除文件
- readFile // 异步读取文件
- readFileSync // 同步读取文件

第三方库 fs-extra 功能扩展

// readFile { (filename: string, type?: string, handler: (err, data: string|Buffer) => void) => void }

---

**http**

- createServer 创建 web 服务

```js
const http = require('http');
// 创建web服务
const server = http.createServer((request, response) => {
  // request.write 将内容写入响应体中
  // request.end 将响应报文发送给客户端
});
// 监听端口
server.listen(8080, err => {
  if (err) throw err; // 中断并抛出错误
  console.log('web服务启动成功！监听端口：8080');
});
```

---

**模块全局环境成员**

- \_\_dirname // 获取文件所在目录的路径(REPL 环境无效)
- \_\_filename // 获取文件的完整路径(REPL 环境无效)
- module // 模块对象
- exports // `module.exports`别名
- require() //

---

**path**

- basename // 获取文件名(不含扩展名)
- dirname // 获取文件所在文件夹路径
- join // 拼接路径
- delimiter // 获取系统环境变量路径分割符
- dirname // 获取路径的目录部分
- extname // 获取路径的扩展名部分
- parse // 将路径字符串转成对象
- format // 将路径对象转字符串
- isAbsolute // 判断路径是否为绝对路径
- normalize // 路径标准化
- relative // 获取目标文件相对于当前文件的相对路径
- resolve // 拼接路径
- sep // 获取系统路径分割符
- win32 // 指定操作路径的方式为 Window 环境模式
- posix // 指定操作路径的方式为 Linux 环境模式

---

**npm 常用命令**

- config [ls|set] // 配置对象信息
- init // 创建`package.json`
- search [name] // 找包（用处不大）
- info [name] // 获取包的介绍信息
- install [name] // 安装包
- uninstall [name] // 卸载包
- outdated [name] // 检查更新
- update [name] // 更新
- run // 运行`scripts`定义的命令
- cache [clean|ls] // 包缓存

---

**lib**

- iconv-lite // 解决编码问题
- marked // md 转 html
- browser-sync // 本地 server
- progress // 控制台进度
- fs-extra // 操作文件
- nodemon // 监听 js 文件自动重启终端

```js
// browser-sync
const browserSync = require('browser-sync');
browserSync({
  notify: false, // 是否显示提示框
  server: 'src'
});
```

---

**流**

- createReadStrem
- createWriteStrem

---

**创建 socket 服务器**

```js
const net = require('net');
// 创建并注册连接事件
const server = net.createServer(socket => {});
// 监听端口
server.listen(3000, err => {
  if (err) throw err; // 端口被占用
  // todo..
});
```

- createServer // { ((socket: () => void)) => void }
- connect // createServer 的别名
- write // 传输的方法
- data // 监听传输
