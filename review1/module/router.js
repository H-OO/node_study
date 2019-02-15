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
