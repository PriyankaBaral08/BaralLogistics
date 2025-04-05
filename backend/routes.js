
const express = require('express');
const fs = require('fs');
const router = express.Router();

const dataPath = './backend/data.json';

const readData = () => {
  const raw = fs.readFileSync(dataPath);
  return JSON.parse(raw);
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

router.get('/parcels', (req, res) => {
  const parcels = readData();
  res.json(parcels);
});

router.post('/parcels', (req, res) => {
  const parcels = readData();
  const newParcel = { id: Date.now(), ...req.body };
  parcels.push(newParcel);
  writeData(parcels);
  res.status(201).json(newParcel);
});

router.put('/parcels/:id', (req, res) => {
  let parcels = readData();
  const parcelId = parseInt(req.params.id);
  parcels = parcels.map(parcel =>
    parcel.id === parcelId ? { ...parcel, ...req.body } : parcel
  );
  writeData(parcels);
  res.json({ message: 'Parcel updated' });
});

router.delete('/parcels/:id', (req, res) => {
  let parcels = readData();
  parcels = parcels.filter(parcel => parcel.id !== parseInt(req.params.id));
  writeData(parcels);
  res.json({ message: 'Parcel deleted' });
});

module.exports = router;
