function authenticate(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (req.url.startsWith('/api') && apiKey !== '12345') {
    res.writeHead(403);
    res.end('Forbidden');
  } else {
    next?.();
  }
}
module.exports = { authenticate };
