const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./devtools.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tools (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      link TEXT,
      tag TEXT
    )
  `);
});

module.exports = db;
