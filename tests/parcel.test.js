
test('Add parcel data', () => {
  const parcels = [];
  const newParcel = { id: 1, customer: 'Ram', destination: 'Kathmandu', status: 'Pending' };
  parcels.push(newParcel);
  expect(parcels.length).toBe(1);
});
