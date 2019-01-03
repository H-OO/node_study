# Node

Node 是一个平台，是它选择了JS并为其提供API，让JS能进行后台开发

**概念**

- 回调函数，错误优先
- 异步 // 网络操作或磁盘操作
- I/O // input/output
- 非阻塞机制 // 耗时事件都先放入`事件队列`等待`Event Loop`去执行，触发回调
- 异步操作无法通过`try-catch`语句捕获异常
- thread poolth // 线程池，Node 将阻塞操作交给内部维护的线程池
- Node 主线程通过不断调度实现非阻塞
- 所有的文件操作必须是绝对路径
- 一个js文件就是一个模块
- 模块需要有输出
- 模块内部是一个独立作用域，模块与模块之间互不影响

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

---

**http**

- createServer 创建web服务

```js
const http = require('http');
// 创建web服务
const server = http.createServer((request, response) => {
  // request.write 将内容写入响应体中
  // request.end 将响应报文发送给客户端
});
// 监听端口
server.listen(8080, (err) => {
  if (err) throw err; // 中断并抛出错误
  console.log('web服务启动成功！监听端口：8080');
})
```

---

**模块全局环境成员**

- __dirname // 获取文件所在目录的路径(REPL环境无效)
- __filename // 获取文件的完整路径(REPL环境无效)
- module // 模块对象
- exports // `module.exports`别名
- require() // 

---

**require**

```js

```

---

**path**

- basename // 获取文件名(不含扩展名)
- dirname // 获取文件所在文件夹路径
- join // 拼接
