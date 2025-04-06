
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

  // ✅ Access inputs directly by ID
  const parcel = {
    customer: document.getElementById('customer').value,
    destination: document.getElementById('destination').value,
    status: document.getElementById('status').value
  };

  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parcel)
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("❌ API Error:", result);
      alert(`Error: ${result.error}`);
    } else {
      console.log("✅ Parcel added:", result);
      form.reset();
      loadParcels();
    }
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    alert("Failed to add parcel.");
  }
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
