const express = require('express');
const usageRoutes = require('./interfaces/routes/usageRoutes');
const app = express();

app.use('/', usageRoutes);

module.exports = app;
