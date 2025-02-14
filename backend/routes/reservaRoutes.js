// routes/reservaRoutes.js
const express = require('express');
const { body, validationResult } = require('express-validator'); // <-- Importar express-validator
const { autenticarUsuario } = require('../middlewares/authMiddleware');
const {
  crearReserva,
  obtenerReservas,
  actualizarReserva,
} = require('../controllers/reservaController');

const router = express.Router();

// Validaciones para crear una reserva
const validarCrearReserva = [
  body('fecha').isISO8601().toDate().withMessage('La fecha debe ser válida'),
  body('area').isIn(['piscina', 'salon', 'gimnasio']).withMessage('El área no es válida'),
];

// Ruta para crear una reserva (con validaciones)
router.post('/', autenticarUsuario, validarCrearReserva, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  crearReserva(req, res);
});

// Obtener todas las reservas
router.get('/', autenticarUsuario, obtenerReservas);

// Actualizar una reserva
router.put('/:id', autenticarUsuario, actualizarReserva);

module.exports = router;