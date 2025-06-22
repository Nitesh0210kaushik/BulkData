const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors()); // ✅ fix here

app.use(express.json()); // for JSON request bodies

// Routes
const recordRoutes = require('./routes/record.routes');
app.use('/records', recordRoutes); // API prefix: /records/...

// Swagger setup
const setupSwagger = require('./swagger');
setupSwagger(app);

// Export app for index.js or server.js to run
module.exports = app;
