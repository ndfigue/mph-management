// routes/unidadRoutes.js
const express = require('express');
const { autenticarUsuario } = require('../middlewares/authMiddleware');
const {
  obtenerUnidades,
  crearUnidad,
  actualizarUnidad,
  eliminarUnidad,
} = require('../controllers/unidadController');

console.log(autenticarUsuario);
const router = express.Router();

// Rutas protegidas
router.get('/', autenticarUsuario, obtenerUnidades); // <-- Aquí está el problema
router.post('/', autenticarUsuario, crearUnidad);
router.put('/:id', autenticarUsuario, actualizarUnidad);
router.delete('/:id', autenticarUsuario, eliminarUnidad);

module.exports = router;