const fs = require('fs');
const path = require('path');
const prodPath = path.join(__dirname, '../data/products.json');
let products = fs.existsSync(prodPath) ? JSON.parse(fs.readFileSync(prodPath)) : [];

module.exports = (router) => {
  // GET /api/v1/products
  router.get('', (req, res) => {
    res.json(products);
  });

  // GET /api/v1/products/:id
  router.get('/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    product ? res.json(product) : res.status(404).json({ error: 'Not found' });
  });

  // POST /api/v1/products
  router.post('/', (req, res) => {
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    fs.writeFileSync(prodPath, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
  });

  // PUT /api/v1/products/:id
  router.put('/:id', (req, res) => {
    let found = false;
    products = products.map(p => {
      if (p.id == req.params.id) {
        found = true;
        return { ...p, ...req.body };
      }
      return p;
    });
    if (!found) return res.status(404).json({ error: 'Not found' });
    fs.writeFileSync(prodPath, JSON.stringify(products, null, 2));
    res.json({ success: true });
  });

  // DELETE /api/v1/products/:id
  router.delete('/:id', (req, res) => {
    const origLength = products.length;
    products = products.filter(p => p.id != req.params.id);
    if (products.length === origLength) return res.status(404).json({ error: 'Not found' });
    fs.writeFileSync(prodPath, JSON.stringify(products, null, 2));
    res.json({ success: true });
  });
};
