// routes/visitaRoutes.js
const express = require('express');
const { body, validationResult } = require('express-validator'); // <-- Importar express-validator
const { autenticarUsuario } = require('../middlewares/authMiddleware');
const {
  crearVisita,
  obtenerVisitas,
  validarVisita,
} = require('../controllers/visitaController');
console.log(autenticarUsuario);
console.log(obtenerVisitas);
const router = express.Router();

// Validaciones para crear una visita
const validarCrearVisita = [
  body('usuarioId').isInt().withMessage('El ID de usuario debe ser un número entero'),
];

// Ruta para crear una visita (con validaciones)
router.post('/', autenticarUsuario, validarCrearVisita, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  crearVisita(req, res);
});

// Obtener todas las visitas
router.get('/', autenticarUsuario, obtenerVisitas);

// Validar una visita
router.post('/validar', autenticarUsuario, (req, res) => {
  validarVisita(req, res);
});

module.exports = router;