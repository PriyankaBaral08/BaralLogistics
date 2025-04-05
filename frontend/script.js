
const API = 'http://localhost:3000/api/parcels';

const form = document.getElementById('parcelForm');
const tableBody = document.querySelector('#parcelTable tbody');

const loadParcels = async () => {
  const res = await fetch(API);
  const parcels = await res.json();

  tableBody.innerHTML = '';
  parcels.forEach(p => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${p.id}</td>
      <td>${p.customer}</td>
      <td>${p.destination}</td>
      <td>${p.status}</td>
      <td>
        <button onclick="deleteParcel(${p.id})">Delete</button>
        <button onclick="updateStatus(${p.id})">Update</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const parcel = {
    customer: form.customer.value,
    destination: form.destination.value,
    status: form.status.value
  };

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parcel)
  });

  form.reset();
  loadParcels();
});

const deleteParcel = async (id) => {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadParcels();
};

const updateStatus = async (id) => {
  const newStatus = prompt('Enter new status:');
  if (newStatus) {
    await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    loadParcels();
  }
};

loadParcels();
