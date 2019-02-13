const fs = require('fs');

// 打印`src`目录结构

const dirName = 'src';

logDir(dirName);

function logDir(dirName) {
  let level = 0;
  return (function() {
    fs.readdir(dirName, (err, list) => {
      if (err) {
        console.log(err);
        return false;
      }
      list.forEach(item => {
        const itemPath = `${dirName}/${item}`; // 文件/目录的相对路径
        fs.stat(itemPath, (err, stats) => {
          if (err) {
            console.log(err);
            return false;
          }
          if (stats.isDirectory()) {
            console.log(`${' '.repeat(level)}┝  ${item}`);
            level++;
            logDir(`${dirName}/${item}`);
          } else {
            console.log(`${' '.repeat(level)}┝  ${item}`);
          }
        });
      });
    });
  })()
}
