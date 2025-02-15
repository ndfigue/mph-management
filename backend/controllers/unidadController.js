// controllers/unidadController.js
const { Unidad } = require('../models');

// Obtener todas las unidades
const obtenerUnidades = async (req, res) => {
  try {
    const unidades = await Unidad.findAll();
    res.status(200).json(unidades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las unidades' });
  }
};

// Crear una nueva unidad
const crearUnidad = async (req, res) => {
  const { numero, descripcion } = req.body;

  try {
    const unidad = await Unidad.create({ numero, descripcion });
    res.status(201).json(unidad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la unidad' });
  }
};

// Actualizar una unidad
const actualizarUnidad = async (req, res) => {
  const { id } = req.params;
  const { numero, descripcion } = req.body;

  try {
    const unidad = await Unidad.findByPk(id);
    if (!unidad) {
      return res.status(404).json({ mensaje: 'Unidad no encontrada' });
    }

    unidad.numero = numero || unidad.numero;
    unidad.descripcion = descripcion || unidad.descripcion;
    await unidad.save();

    res.status(200).json(unidad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la unidad' });
  }
};

// Eliminar una unidad
const eliminarUnidad = async (req, res) => {
  const { id } = req.params;

  try {
    const unidad = await Unidad.findByPk(id);
    if (!unidad) {
      return res.status(404).json({ mensaje: 'Unidad no encontrada' });
    }

    await unidad.destroy();
    res.status(200).json({ mensaje: 'Unidad eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la unidad' });
  }
};

// Exportar funciones
module.exports = {
  obtenerUnidades,
  crearUnidad,
  actualizarUnidad,
  eliminarUnidad,
};