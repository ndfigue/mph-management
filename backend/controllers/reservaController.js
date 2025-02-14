// controllers/reservaController.js
const { Reserva, Usuario } = require('../models');
const admin = require('../config/firebase');

// Crear una reserva
const crearReserva = async (req, res) => {
  const { fecha, area } = req.body;
  const usuarioId = req.usuarioId; // Obtenido del middleware de autenticación

  try {
    const reserva = await Reserva.create({ fecha, area, usuarioId });
    res.status(201).json(reserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la reserva' });
  }
};

// Obtener todas las reservas
const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({ include: Usuario });
    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las reservas' });
  }
};

// Aprobar o rechazar una reserva
const actualizarReserva = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const reserva = await Reserva.findByPk(id, { include: Usuario });
    if (!reserva) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }

    reserva.estado = estado;
    await reserva.save();

    // Enviar notificación al usuario
    if (reserva.Usuario && reserva.Usuario.tokenFCM) {
      const titulo = 'Estado de tu reserva';
      const mensaje = `Tu reserva ha sido ${estado}`;
      await enviarNotificacion(reserva.Usuario.tokenFCM, titulo, mensaje);
    }

    res.status(200).json(reserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la reserva' });
  }
};

const enviarNotificacion = async (token, titulo, mensaje) => {
  const message = {
    notification: {
      title: titulo,
      body: mensaje,
    },
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Notificación enviada:', response);
  } catch (error) {
    console.error('Error al enviar notificación:', error);
  }
};


module.exports = {
  crearReserva,
  obtenerReservas,
  actualizarReserva,
};