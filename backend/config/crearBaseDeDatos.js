// config/crearBaseDeDatos.js
const { Client } = require('pg');
require('dotenv').config();

const crearBaseDeDatos = async () => {
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432, // Puerto por defecto de PostgreSQL
  });

  try {
    await client.connect(); // Conectar al servidor de PostgreSQL

    // Verificar si la base de datos ya existe
    const res = await client.query(
      `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${process.env.DB_NAME}'`
    );

    if (res.rowCount === 0) {
      // Si no existe, crear la base de datos
      await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(`Base de datos "${process.env.DB_NAME}" creada.`);
    } else {
      console.log(`La base de datos "${process.env.DB_NAME}" ya existe.`);
    }
  } catch (error) {
    console.error('Error al crear la base de datos:', error);
  } finally {
    await client.end(); // Cerrar la conexión
  }
};

module.exports = crearBaseDeDatos;