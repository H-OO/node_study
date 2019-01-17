const fs = require('fs');
const path = require('path');
function getMime(extname, callback) {
  const filename = path.join(__dirname, './mime.json');
  fs.readFile(filename, (err, data) => {
    if (err) throw err;
    const _data = JSON.parse(data.toString());
    callback(_data[extname]);
  });
}

module.exports = getMime;