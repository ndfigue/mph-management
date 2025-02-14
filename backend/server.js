const app = require('./app');
const sequelize = require('./config/db');
const crearBaseDeDatos = require('./config/crearBaseDeDatos');

const PORT = process.env.PORT || 5000;

// Crear la base de datos si no existe
crearBaseDeDatos().then(() => {
  // Sincronizar modelos con la base de datos
  sequelize
    .sync({ force: false }) // force: true borra y recrea las tablas (¡cuidado!)
    .then(() => {
      console.log('Modelos sincronizados con la base de datos.');

      // Iniciar el servidor
      app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Error al sincronizar modelos:', error);
    });
});