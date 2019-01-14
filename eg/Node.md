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
- npm list // 查看已安装的node包列表
- npm info `ModuleName` // 查看包的其他版本
- npm install `ModuleName`@x.y.z // 指定版本安装
- 
