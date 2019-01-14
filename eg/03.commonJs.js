const path = require('path');

// 引入自己的commonJs模块
const Tree = require('../self_module/tree');

const tree = new Tree({
  entry: path.resolve(__dirname, 'src')
});
tree.init();

/**
 * 模块查找顺序
 */
// const xxx = require('xxx');
// 先在根目录下查找
// → node_modules 查找对应文件夹 xxx
// → 在该文件夹下查找入口文件 package.json
// → 入口文件 "main": "xxx.js"
