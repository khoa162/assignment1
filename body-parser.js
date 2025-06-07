const { StringDecoder } = require('string_decoder');
const querystring = require('querystring');

async function parseBody(req) {
  return new Promise((resolve) => {
    const decoder = new StringDecoder('utf8');
    let buffer = '';

    req.on('data', chunk => buffer += decoder.write(chunk));
    req.on('end', () => {
      buffer += decoder.end();
      if (req.headers['content-type']?.includes('application/json')) {
        req.body = JSON.parse(buffer || '{}');
      } else if (req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
        req.body = querystring.parse(buffer);
      } else {
        req.body = {};
      }
      resolve();
    });
  });
}
module.exports = { parseBody };
