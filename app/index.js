const http = require('http');
const route = require('./tools/express-route');
const app = http.createServer(route);

route.get('/login', (req, res) => {
  res.end('login');
});

app.listen(8888);
