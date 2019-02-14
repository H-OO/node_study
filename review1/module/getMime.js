const fs = require('fs');
const path = require('path');

exports.getMime = function(extname) {
  try {
    const filename = path.join(__dirname, '../public/mime/mime.json');
    const dataJSON = fs.readFileSync(filename, 'utf-8');
    const data = JSON.parse(dataJSON);
    return data[extname];
  } catch (err) {
    console.log(err);
  }
};
