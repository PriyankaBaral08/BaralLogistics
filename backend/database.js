
const sqlite3 = require('sqlite3').verbose();

// Open or create the database
const db = new sqlite3.Database('./backend/parcels.db', (err) => {
  if (err) return console.error(err.message);
  console.log('✅ Connected to SQLite database.');
});

// Create the parcels table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS parcels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer TEXT NOT NULL,
    destination TEXT NOT NULL,
    status TEXT NOT NULL
  )
`);

module.exports = db;
