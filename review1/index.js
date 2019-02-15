// const http = require('http');
// const url = require('url');
// const app = http.createServer((req, res) => {
//   const method = req.method.toLowerCase();
//   if (method === 'get') {
//     // 假设请求地址为 127.0.0.1:9000?aid=1
//     const { query } = url.parse(req.url, true);
//     console.log(query); // { aid: '1' }
//   } else if (method === 'post') {
//     // 假设使用 x-www-form-urlencoded 格式传递参数
//     // key | value
//     // aid | 1
//     // level | 6
//     let queryStr = '';
//     req.on('data', chunk => {
//       queryStr += chunk;
//     });
//     req.on('end', () => {
//       const { query } = url.parse(`?${queryStr}`, true);
//       console.log(query); // { aid: '1', level: '6' }
//     });
//   }
//   res.end('end');
// });
// app.listen(9000);

// const http = require('http');
// const router = require('./module/router');

// const app = http.createServer((req, res) => {
//   router.statics(req, res, 'statics');
// });

// app.listen(9000);

// const http = require('http');
// const ejs = require('ejs');
// const app = http.createServer((req, res) => {
//   ejs.renderFile('statics/index.html', {
//     msg: '替换占位符', // 占位符 <%= msg%>
//     html: '<h2>HTML片段</h2>' // HTML片段 <%- html %>
//   }, (err, data) => {
//     if (err) {
//       console.log(err);
//       return false;
//     }
//     res.end(data);
//   });
// });

// app.listen(9000);
