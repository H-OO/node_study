const fs = require('fs');

// 读取文件流通过管道写入文件流
const readStream = fs.createReadStream('../Node.md');
const writeStream = fs.createWriteStream('../output.txt');

readStream.pipe(writeStream);