// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const unidadRoutes = require('./routes/unidadRoutes'); // <-- Importación correcta
const reservaRoutes = require('./routes/reservaRoutes');
const visitaRoutes = require('./routes/visitaRoutes');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/unidades', unidadRoutes); // <-- Uso correcto
app.use('/api/reservas', reservaRoutes);
app.use('/api/visitas', visitaRoutes);

module.exports = app;