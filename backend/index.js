const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = 3000;

console.log("🟢 Backend server started");

// ✅ Serve static files from frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

// ✅ Serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log('✅ Connected to SQLite database.');
  console.log("🚀 Server fully started and listening.");
  console.log(`Baral Logistics web application running on http://localhost:${PORT}`);
});
