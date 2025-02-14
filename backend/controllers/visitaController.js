const { Visita, Usuario, Unidad } = require('../models');
const qrcode = require('qrcode');

// Crear una visita con un código QR mejorado
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