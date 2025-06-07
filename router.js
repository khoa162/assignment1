class Router {
  constructor() {
    this.routes = { GET: [], POST: [], PUT: [], DELETE: [] };
    this.middlewares = [];
    this.prefix = '';
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  group(prefix, callback) {
    const prev = this.prefix;
    this.prefix += prefix;
    callback();
    this.prefix = prev;
  }

  register(method, path, handler) {
    this.routes[method].push({ path: this.prefix + path, handler });
  }

  get(path, handler) { this.register('GET', path, handler); }
  post(path, handler) { this.register('POST', path, handler); }
  put(path, handler) { this.register('PUT', path, handler); }
  delete(path, handler) { this.register('DELETE', path, handler); }

  async handle(req, resRaw, resHandler) {
    for (const m of this.middlewares) await m(req, resRaw);
    const methodRoutes = this.routes[req.method] || [];
    for (const route of methodRoutes) {
      const regex = new RegExp(`^${route.path.replace(/:\w+/g, '(\\w+)')}$`);
      const match = req.url.match(regex);
      if (match) {
        const keys = [...route.path.matchAll(/:(\w+)/g)].map(m => m[1]);
        req.params = keys.reduce((acc, key, idx) => (acc[key] = match[idx + 1], acc), {});
        await route.handler(req, resHandler);
        return;
      }
    }

    if (!resRaw.writableEnded) {
      resRaw.writeHead(404, { 'Content-Type': 'text/plain' });
      resRaw.end('Not found');
    }
  }
}
module.exports = Router;
