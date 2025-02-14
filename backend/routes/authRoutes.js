// routes/authRoutes.js
const express = require('express');

const { registrarUsuario, loginUsuario } = require('../controllers/authController');

const router = express.Router();

// Registrar usuario
router.post('/registrar', registrarUsuario);

// Login de usuario
router.post('/login', loginUsuario);

module.exports = router;