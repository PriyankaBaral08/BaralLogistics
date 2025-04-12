const express = require('express');
const router = express.Router();
const db = require('./database');

// ✅ GET all parcels
router.get('/parcels', (req, res) => {
  db.all('SELECT * FROM parcels', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ✅ POST create a new parcel
router.post('/parcels', (req, res) => {
  console.log("📥 POST /parcels called");
  console.log("📦 Request body:", req.body);

  const { customer, destination, status, weight, bookingDate } = req.body;

  // Validate all fields
  if (!customer || !destination || !status || !weight || !bookingDate) {
    console.error("❌ Missing required fields");
    return res.status(400).json({ error: "All fields are required." });
  }

  const query = `
    INSERT INTO parcels (customer, destination, status, weight, bookingDate)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [customer, destination, status, weight, bookingDate];

  console.log("📤 Running query:", query);
  console.log("📤 With values:", values);

  db.run(query, values, function (err) {
    if (err) {
      console.error("❌ Database error:", err.message);
      return res.status(500).json({ error: err.message });
    }

    console.log("✅ Parcel inserted, ID:", this.lastID);
    res.status(201).json({ id: this.lastID, customer, destination, status, weight, bookingDate });
  });
});

// ✅ PUT update one or more fields of a parcel
router.put('/parcels/:id', (req, res) => {
  const updates = req.body;
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields provided for update." });
  }

  const setClause = fields.map(field => `${field} = ?`).join(', ');
  const query = `UPDATE parcels SET ${setClause} WHERE id = ?`;

  db.run(query, [...values, req.params.id], function (err) {
    if (err) {
      console.error("❌ Update error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: '✅ Parcel updated', id: req.params.id });
  });
});

// ✅ DELETE a parcel
router.delete('/parcels/:id', (req, res) => {
  db.run('DELETE FROM parcels WHERE id = ?', [req.params.id], function (err) {
    if (err) {
      console.error("❌ Delete error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: '🗑️ Parcel deleted', id: req.params.id });
  });
});

module.exports = router;
