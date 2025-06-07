class RedirectNode {
  static redirect(res, url, code = 302) {
    res.writeHead(code, { Location: url });
    res.end();
  }
}
module.exports = RedirectNode;
