const http = require('http');

// 创建服务
const app = http.createServer((req, res) => {
  /**
   * @arguments req 获取URL信息
   * @arguments res 响应信息
   */

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

app.listen(8888);
