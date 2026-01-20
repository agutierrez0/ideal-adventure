const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./payment.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    amount REAL,
    status TEXT
  )`);
});

module.exports = db;