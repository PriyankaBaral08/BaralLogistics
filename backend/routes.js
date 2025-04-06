const express = require('express');
const router = express.Router();
const db = require('./database');

// GET all parcels
router.get('/parcels', (req, res) => {
  db.all('SELECT * FROM parcels', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST create a new parcel
router.post('/parcels', (req, res) => {
  console.log("📥 POST /parcels called");
  console.log("📦 Request body:", req.body);

  const { customer, destination, status } = req.body;

  if (!customer || !destination || !status) {
    console.error("❌ Missing required fields");
    return res.status(400).json({ error: "All fields are required." });
  }

  const query = 'INSERT INTO parcels (customer, destination, status) VALUES (?, ?, ?)';
  const values = [customer, destination, status];

  console.log("📤 Running query:", query);
  console.log("📤 With values:", values);

  db.run(query, values, function (err) {
    if (err) {
      console.error("❌ Database error:", err.message);
      return res.status(500).json({ error: err.message });
    }

    console.log("✅ Parcel inserted, ID:", this.lastID);
    res.status(201).json({ id: this.lastID, customer, destination, status });
  });
});

// PUT update a parcel's status
router.put('/parcels/:id', (req, res) => {
  const { status } = req.body;
  db.run(
    'UPDATE parcels SET status = ? WHERE id = ?',
    [status, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Parcel updated' });
    }
  );
});

// DELETE a parcel
router.delete('/parcels/:id', (req, res) => {
  db.run('DELETE FROM parcels WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Parcel deleted' });
  });
});

module.exports = router;
