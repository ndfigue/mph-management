// src/pages/Visitas.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Visitas = () => {
  const [visitas, setVisitas] = useState([]);

  useEffect(() => {
    const obtenerVisitas = async () => {
      try {
        const response = await api.get('/visitas');
        setVisitas(response.data);
      } catch (error) {
        console.error('Error al obtener visitas:', error);
      }
    };

    obtenerVisitas();
  }, []);

  return (
    <div>
      <h1>Visitas</h1>
      <ul>
        {visitas.map((visita) => (
          <li key={visita.id}>
            {visita.nombreVisitante} - {visita.codigoQR}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Visitas;