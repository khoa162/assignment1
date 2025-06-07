// routes/users.js
const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');
let users = fs.existsSync(usersPath) ? JSON.parse(fs.readFileSync(usersPath)) : [];

module.exports = (router) => {
  router.get('', (req, res) => {
    res.json(users);
  });

  router.get('/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    user ? res.json(user) : res.status(404).json({ error: 'Not found' });
  });

  router.post('/', (req, res) => {
    const newUser = { id: Date.now(), ...req.body };
    users.push(newUser);
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    res.status(201).json(newUser);
  });

  router.put('/:id', (req, res) => {
    let found = false;
    users = users.map(u => {
      if (u.id == req.params.id) {
        found = true;
        return { ...u, ...req.body };
      }
      return u;
    });
    if (!found) return res.status(404).json({ error: 'Not found' });
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    res.json({ success: true });
  });

  router.delete('/:id', (req, res) => {
    const origLength = users.length;
    users = users.filter(u => u.id != req.params.id);
    if (users.length === origLength) return res.status(404).json({ error: 'Not found' });
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    res.json({ success: true });
  });
};

