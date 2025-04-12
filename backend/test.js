console.log("✅ Node is working!");
// tests/api.test.js

const request = require('supertest');
const express = require('express');
const routes = require('../backend/routes');
const bodyParser = require('body-parser');

// Create a test app using the same routes
const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

describe('Parcel CRUD API', () => {
  let createdParcelId = null;

  // ✅ CREATE
  it('should create a new parcel', async () => {
    const response = await request(app)
      .post('/api/parcels')
      .send({
        customer: "Test User",
        destination: "Test City",
        status: "Dispatched",
        weight: 2.5,
        bookingDate: "2024-04-12"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdParcelId = response.body.id;
  });

  // ✅ READ
  it('should retrieve all parcels', async () => {
    const response = await request(app).get('/api/parcels');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // ✅ UPDATE
  it('should update the status of the created parcel', async () => {
    const response = await request(app)
      .put(`/api/parcels/${createdParcelId}`)
      .send({ status: "Delivered" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', '✅ Parcel updated');
  });

  // ✅ DELETE
  it('should delete the created parcel', async () => {
    const response = await request(app).delete(`/api/parcels/${createdParcelId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', '🗑️ Parcel deleted');
  });
});
