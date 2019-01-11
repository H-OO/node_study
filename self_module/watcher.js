/**
 * 监听文件改变
 */
const fs = require('fs');
const path = require('path');

class Watcher {
  constructor(args) {
    this.dir = args.dir;
  }
  init() {
    this.watch();
  }
  watch() {
    fs.watchFile(this.dir, (curr, prev) => {
      console.log(`当前的最近修改时间是: ${curr.mtime}`);
      console.log(`之前的最近修改时间是: ${prev.mtime}`);
    });
  }
}

module.exports = Watcher;
