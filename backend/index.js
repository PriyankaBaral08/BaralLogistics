console.log("🟢 Backend server started");



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = 3000;
app.use(express.static('frontend'));

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Baral Logistics web application running on http://localhost:${PORT}`);
});
