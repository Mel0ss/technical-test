const express = require('express');
const app = express();
const productsRoutes = require('./routes/routes.js');

app.use(express.json());

// Rutas para productos
app.use('/products', productsRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = app;