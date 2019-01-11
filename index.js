const path = require('path');

// const Tree = require('./self_module/tree');
// const tree = new Tree({
//   entry: path.resolve(__dirname, 'src')
// });
// tree.init();

// const Watcher = require('./self_module/watcher');
// const watcher = new Watcher({
//   dir: path.resolve(__dirname, 'src/c.js')
// });
// watcher.init();


// const watcher2 = new Watcher({
//   dir: path.resolve(__dirname, 'src/d.js')
// });
// watcher2.init();

const browserSync = require('browser-sync');
browserSync({
  notify: false, // 是否显示提示框
  server: 'src'
})
