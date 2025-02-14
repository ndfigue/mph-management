const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Visita = sequelize.define('Visita', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  codigoQR: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  estado: {
    type: DataTypes.ENUM('activa', 'expirada'),
    defaultValue: 'activa',
  },
});

module.exports = Visita;