// 实现require方法
function _require(path) {
  console.log(path);
  const filename = __dirname + '/' + path;
  console.log(filename)
}
const a = _require('./module/a.js');