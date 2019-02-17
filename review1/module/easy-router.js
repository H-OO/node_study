// 将不同路由对应的处理函数作为对象成员，通过路由路径进行动态调用

const router = {
  index(req, res) {
    res.end('index');
  },
  login(req, res) {
    res.end('login');
  }
};

module.exports = router;
