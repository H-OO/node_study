const ejs = require('ejs');
const http = require('http');
const path = require('path');

const app = http.createServer((req, res) => {
  let { url: address } = req;
  if (address !== '/favicon.ico') {
    const filename = path.join(__dirname, '../static/template.ejs');
    const props = {
      msg: 'EJS',
      list: ['a', 'b', 'c'],
      html: '<h2>html</h2>'
    };
    // renderFile { filename: string, props: object, callback: () => void => void }
    ejs.renderFile(filename, props, (err, data) => {
      if (err) throw err;
      res.write(data);
      res.end();
    })
  }
});

app.listen(8888);
