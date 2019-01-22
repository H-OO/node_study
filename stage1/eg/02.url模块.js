const url = require('url');

// 解析 URL
// parse { (url: string, serialized?: boolean = false) => Url }
url.parse(
  'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash',
  true
);
// 返回结果，打印如下 ↓↓↓
// Url {
//   protocol: 'https:',
//   slashes: true,
//   auth: 'user:pass',
//   host: 'sub.host.com:8080',
//   port: '8080',
//   hostname: 'sub.host.com',
//   hash: '#hash',
//   search: '?query=string',
//   ---
//   query: 'query=string', // false
//   query: { query: 'string' } // true
//   ---
//   pathname: '/p/a/t/h',
//   path: '/p/a/t/h?query=string',
//   href: 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash' }

// parse 逆向操作
// format { (url: Url) => string }

// 替换最后一层路径
// resolve { (from: string, to: string) => string }
url.resolve(
  'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash',
  'xxx'
);
// 返回结果，打印如下 ↓↓↓
// https://user:pass@sub.host.com:8080/p/a/t/xxx


/**
 * 在服务中的应用
 */
const http = require('http');

// 创建服务
const server = http.createServer((req, res) => {
  /**
   * @arguments req 获取URL信息
   * @arguments res 响应信息
   */

  // 过滤无效请求路径
  if (req.url !== '/favicon.ico') {
    // 假设浏览器输入 http://127.0.0.1:8888/p/a/t/h?aid=0
    console.log(req.url); // /p/a/t/h?aid=0
    const urlParse = url.parse(req.url, true);
    console.log(urlParse.query.aid); // 0
  }

  // 设置HTTP头部，状态码
  // writeHead { (code: number, msg: object) => void }
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8'
  });

  // 写入响应体
  // write { (content: string) => void }
  res.write('Hello world');

  // 结束响应
  // end { () => void }
  res.end();
});

server.listen(8888);
