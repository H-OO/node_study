const fs = require('fs');
const path = require('path');
// const events = require('events');
// const EventEmitter = new events.EventEmitter();

exports.getMime = function(extname, EventEmitter) {
  // try {
  //   const filename = path.join(__dirname, '../public/mime/mime.json');
  //   const dataJSON = fs.readFileSync(filename, 'utf-8');
  //   const data = JSON.parse(dataJSON);
  //   return data[extname];
  // } catch (err) {
  //   console.log(err);
  // }

  const filename = path.join(__dirname, '../public/mime/mime.json');

  fs.readFile(filename, 'utf-8', (err, dataJSON) => {
    if (err) {
      console.log(err);
    } else {
      const data = JSON.parse(dataJSON);
      console.log('emit get_mime');
      EventEmitter.emit('get_mime', data[extname]);
    }
  });
};
