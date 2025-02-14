const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Reserva = sequelize.define('Reserva', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  area: {
    type: DataTypes.ENUM('piscina', 'salon', 'gimnasio'),
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'aprobada', 'rechazada'),
    defaultValue: 'pendiente',
  },
});

module.exports = Reserva;