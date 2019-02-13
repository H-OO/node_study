const fs = require('fs');

// 递归打印目录结构
class LogDir {
  constructor(dirName) {
    this.level = 0;
    this.read(dirName);
  }
  read(dirName) {
    try {
      const members = fs.readdirSync(dirName);
      const len = members.length - 1;
      members.forEach((member, i) => {
        const filename = `${dirName}/${member}`;
        const stats = fs.statSync(filename);
        if (stats.isDirectory()) {
          if (i !== len) {
            console.log(`${'   '.repeat(this.level)}┣━ ${member}`);
          } else {
            console.log(`${'   '.repeat(this.level)}┗━ ${member}`);
          }
          this.level++;
          this.read(filename);
        } else {
          if (i !== len) {
            console.log(`${'   '.repeat(this.level)}┣━ ${member}`);
          } else {
            console.log(`${'   '.repeat(this.level)}┗━ ${member}`);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = LogDir;
