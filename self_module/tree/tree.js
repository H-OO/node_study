/**
 * 遍历文档树
 */
const fs = require('fs');
const path = require('path');

// ┌ └ ├ │┄ ─

class Tree {
  constructor(params) {
    this.dir = path.resolve(params.entry);
  }
  /**
   * 初始化 { () => void }
   */
  init() {
    this.getDirStruct(this.dir);
  }
  /**
   * getDirStruct { () => void }
   */
  getDirStruct(dir, level = 0) {
    const folders = []; // 文件夹
    const files = []; // 文件
    try {
      // 获取成员列表
      const members = fs.readdirSync(dir); // { Array<string> }
      // 遍历成员
      members.forEach(member => {
        const filename = path.resolve(dir, member);
        const stats = fs.statSync(filename);
        if (stats.isDirectory()) {
          folders.push(member); // 文件夹成员
        } else {
          files.push(member); // 文件成员
        }
      });
      // 树形前缀
      const prefix = '│  '.repeat(level);
      // 遍历文件夹
      folders.forEach(folder => {
        console.log(`${prefix}├─ ${folder}`);
        this.getDirStruct(path.resolve(dir, folder), level + 1); // 递归深入文件夹
      });
      // 遍历文件
      const filesLen = files.length;
      files.forEach((file, i) => {
        console.log(`${prefix}${i === filesLen - 1 ? '└─ ' : '├─ '}${file}`);
      });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Tree;

// use
// const Tree = require('./self_module/tree');
// const tree = new Tree({
//   entry: path.resolve(__dirname, 'src')
// });
// tree.init();
