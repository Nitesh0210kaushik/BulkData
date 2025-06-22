const express = require('express');
const app = express();
const cors = require('cors');

// ✅ CORS setup
app.use(cors({
    origin: '*', // Replace * with frontend origin in production
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.options('*', cors());

// ✅ Parse JSON
app.use(express.json());

// ✅ Routes
const recordRoutes = require('./routes/record.routes');
app.use('/records', recordRoutes);

// ✅ Swagger
const setupSwagger = require('./swagger');
setupSwagger(app);

module.exports = app;
