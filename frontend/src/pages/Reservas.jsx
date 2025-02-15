// src/pages/Reservas.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const response = await api.get('/reservas');
        setReservas(response.data);
      } catch (error) {
        console.error('Error al obtener reservas:', error);
      }
    };

    obtenerReservas();
  }, []);

  return (
    <div>
      <h1>Reservas</h1>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            {reserva.fecha} - {reserva.area}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservas;