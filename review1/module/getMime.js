const fs = require('fs');

exports.getMime = function (extname) {
  try {
    // const data = fs.readFileSync('../public/mime/mime.json', 'utf-8');
    // console.log(data);
  } catch (err) {
    console.log(err);
  }
  console.log(extname);
};
