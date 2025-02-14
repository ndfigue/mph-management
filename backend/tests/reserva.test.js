const request = require('supertest');
const app = require('../app');
const { Reserva } = require('../models');

describe('Pruebas para las rutas de reservas', () => {
  beforeAll(async () => {
    // Limpiar la base de datos antes de las pruebas
    await Reserva.destroy({ where: {} });
  });

  it('Debería crear una reserva', async () => {
    const response = await request(app)
      .post('/api/reservas')
      .send({
        fecha: '2023-12-01T10:00:00Z',
        area: 'piscina',
        usuarioId: 1,
      })
      .set('Authorization', 'Bearer token-valido');

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Debería obtener todas las reservas', async () => {
    const response = await request(app)
      .get('/api/reservas')
      .set('Authorization', 'Bearer token-valido');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});