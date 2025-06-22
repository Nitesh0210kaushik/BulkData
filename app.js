const express = require('express');
const cors = require('cors');
const app = express();

// CORS setup
app.use(cors());
app.use(express.json());

// Contact route
const recordRoutes = require('./routes/record.routes');
app.use('/records', recordRoutes); // You’ll use /records/contactMe

module.exports = app;
