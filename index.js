const path = require('path');
const Tree = require('./self_module/tree');

const tree = new Tree({
  entry: path.resolve(__dirname, 'src')
});

tree.init();
