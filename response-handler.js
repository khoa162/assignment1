const fs = require('fs');

class ResponseHandler {
  constructor(res) {
    this.res = res;
  }

  status(code) {
    this.res.statusCode = code;
    return this;
  }

  send(data) {
    if (typeof data === 'object') {
      this.json(data);
    } else {
      this.res.setHeader('Content-Type', 'text/plain');
      this.res.end(data);
    }
  }

  json(data) {
    this.res.setHeader('Content-Type', 'application/json');
    this.res.end(JSON.stringify(data));
  }

  html(content) {
    this.res.setHeader('Content-Type', 'text/html');
    this.res.end(content);
  }

  file(filePath) {
    const stream = fs.createReadStream(filePath);
    stream.pipe(this.res);
  }

  error(message, code = 500) {
    this.status(code).json({ error: message });
  }
}
module.exports = ResponseHandler;
