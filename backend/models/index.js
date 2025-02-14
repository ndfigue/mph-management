const Usuario = require('./Usuario');
const Unidad = require('./Unidad');
const Reserva = require('./Reserva');
const Visita = require('./Visita');

// Relaciones
Usuario.belongsTo(Unidad); // Un usuario pertenece a una unidad
Unidad.hasMany(Usuario); // Una unidad puede tener muchos usuarios

Reserva.belongsTo(Usuario); // Una reserva pertenece a un usuario
Usuario.hasMany(Reserva); // Un usuario puede tener muchas reservas

Visita.belongsTo(Usuario); // Una visita pertenece a un usuario
Usuario.hasMany(Visita); // Un usuario puede tener muchas visitas

module.exports = {
  Usuario,
  Unidad,
  Reserva,
  Visita,
};