// src/pages/Unidades.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Unidades = () => {
  const [unidades, setUnidades] = useState([]);

  useEffect(() => {
    const obtenerUnidades = async () => {
      try {
        const response = await api.get('/unidades');
        setUnidades(response.data);
      } catch (error) {
        console.error('Error al obtener unidades:', error);
      }
    };

    obtenerUnidades();
  }, []);

  return (
    <div>
      <h1>Unidades</h1>
      <ul>
        {unidades.map((unidad) => (
          <li key={unidad.id}>
            {unidad.numero} - {unidad.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Unidades;