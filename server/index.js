const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));

const db = require('./db');

// CREATE
app.post('/tools', (req, res) => {
  const { name, description, link, tag } = req.body;
  const stmt = db.prepare(`INSERT INTO tools (name,description,link,tag) VALUES (?,?,?,?)`);
  stmt.run(name, description, link, tag, function(err) {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: this.lastID });
  });
});

// READ ALL
app.get('/tools', (req, res) => {
  db.all('SELECT * FROM tools', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// UPDATE
app.put('/tools/:id', (req, res) => {
  const { name, description, link, tag } = req.body;
  db.run(
    `UPDATE tools SET name=?,description=?,link=?,tag=? WHERE id=?`,
    [name, description, link, tag, req.params.id],
    function(err) {
      if (err) return res.status(500).json(err);
      res.json({ changes: this.changes });
    }
  );
});

// DELETE
app.delete('/tools/:id', (req, res) => {
  db.run(`DELETE FROM tools WHERE id=?`, [req.params.id], function(err) {
    if (err) return res.status(500).json(err);
    res.json({ changes: this.changes });
  });
});
