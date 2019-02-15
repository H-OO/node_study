const fs = require('fs');
const path = require('path');

exports.getMime = function(extname, EventEmitter) {
  const filename = path.join(__dirname, '../public/mime/mime.json');
  fs.readFile(filename, 'utf-8', (err, dataJSON) => {
    if (err) {
      console.log(err);
    } else {
      const data = JSON.parse(dataJSON);
      EventEmitter.emit('get_mime', data[extname]);
    }
  });
};
