const http = require('http');
const url = require('url');
const fs = require('fs');
const mimeModule = require('./module/getMime');

const app = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url, true);
  if (pathname !== '/favicon.ico') {
    if (pathname === '/') {
      pathname = '/index';
    }
    console.log(pathname);
    const filename = `views/${pathname}.html`;
    fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
        fs.readFile('views/404.html', 'utf-8', (err, data) => {
          if (err) {
            console.log(err);
            res.write('404');
          } else {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'});
            res.write(data);
          }
          res.end();
        })
      } else {
        const mime = mimeModule.getMime('.html');
        console.log(mime);
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf8'});
        // res.writeHead(200, {'Content-Type': `${mime};charset=utf8`});
        res.write(data);
        res.end();
      }
    });
  } else {
    res.end();
  }
});

app.listen(9000);
