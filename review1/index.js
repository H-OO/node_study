const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const events = require('events');
const EventEmitter = new events.EventEmitter();
const mimeModule = require('./module/getMime');

const app = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url, true);
  if (pathname !== '/favicon.ico') {
    if (pathname === '/') {
      pathname = '/index.html';
    }
    const extname = path.extname(pathname);
    console.log(extname);
    const filename = path.join('statics', pathname);
    console.log(filename);
    fs.readFile(filename, (err, data) => {
      if (err) {
        console.log(err);
        fs.readFile('statics/404.html', (err, data) => {
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
        // const mime = mimeModule.getMime(extname);
        mimeModule.getMime(extname, EventEmitter);
        EventEmitter.on('get_mime', mime => {
          console.log('on get_mime');
          res.writeHead(200, {'Content-Type': `${mime};charset=utf8`});
          // res.write(data); // write after end
          res.end(data);
        });
      }
    });
  } else {
    res.end();
  }
});

app.listen(9000);


// EventEmitter.on('test', data => {
//   console.log(data); // { a: '123' }
// });
// EventEmitter.emit('test', { a: '123' });
