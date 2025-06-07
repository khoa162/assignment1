const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const Router = require('./router');
const ResponseHandler = require('./response-handler');
const { parseBody } = require('./body-parser');
const RedirectNode = require('./redirect-node');
const { authenticate } = require('./auth');
const users = require('./routes/users');
const products = require('./routes/products');

const router = new Router();
router.use(authenticate);

router.group('/api/v1', () => {
  router.group('/users', () => {
    users(router);
  });
  router.group('/products', () => {
    products(router);
  });
});

router.get('/redirect301', (req, res) => {
  RedirectNode.redirect(res, '/api/v1/users', 301);
});

const server = http.createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);
  const response = new ResponseHandler(res);
  await parseBody(req);
  router.handle(req, res, response);
});

server.listen(3000, () => {
  console.log('HTTP server running on port 3000');
});

const options = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
};

https.createServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Welcome to HTTPS Server</h1>');
}).listen(3443, () => {
  console.log('HTTPS server running on port 3443');
});
