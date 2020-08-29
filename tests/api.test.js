const axios = require('axios');

const BASE_URL = process.env['BASE_URL'] || 'http://localhost:3700';

test('GET /tabhinchable devuelve lista tablas', async () => {
    const response = await axios.get(`${BASE_URL}/api/tabhinchable`);

    expect(Array.isArray(response.data.tabHinchable)).toBe(true);
});

test('POST /tabhinchable crea documento', async() => {
    const response = await axios.post(`${BASE_URL}/api/tabhinchable`);
    expect(response.status).toBe(200);
});