// controllers/visitaController.js
const { Visita, Usuario } = require('../models');
const qrcode = require('qrcode');

// Crear una visita
const crearVisita = async (req, res) => {
  const { usuarioId, nombreVisitante, unidadId } = req.body;

  try {
    // Obtener información de la unidad
    const unidad = await Unidad.findByPk(unidadId);
    if (!unidad) {
      return res.status(404).json({ mensaje: 'Unidad no encontrada' });
    }

    // Crear un objeto con la información del QR
    const qrData = JSON.stringify({
      nombreVisitante,
      unidad: unidad.numero,
      fecha: new Date().toISOString(),
    });

    // Generar el código QR
    const codigoQR = await qrcode.toDataURL(qrData);

    // Crear la visita en la base de datos
    const visita = await Visita.create({ codigoQR, usuarioId, nombreVisitante, unidadId });
    res.status(201).json(visita);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la visita' });
  }
};

// Obtener todas las visitas
const obtenerVisitas = async (req, res) => {
  try {
    const visitas = await Visita.findAll({ include: Usuario });
    res.status(200).json(visitas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las visitas' });
  }
};

// Validar una visita (usando el código QR)
const validarVisita = async (req, res) => {
  const { codigoQR } = req.body;

  try {
    const visita = await Visita.findOne({ where: { codigoQR } });
    if (!visita) {
      return res.status(404).json({ mensaje: 'Visita no encontrada' });
    }

    if (visita.estado === 'expirada') {
      return res.status(400).json({ mensaje: 'La visita ha expirado' });
    }

    res.status(200).json({ mensaje: 'Visita válida', visita });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al validar la visita' });
  }
};

// Exportar funciones
module.exports = {
  crearVisita,
  obtenerVisitas,
  validarVisita,
};