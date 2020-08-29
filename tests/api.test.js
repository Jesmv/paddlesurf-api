const axios = require('axios');

const BASE_URL = process.env['BASE_URL'] || 'http://localhost:3700';

test('GET /tabhinchable devuelve lista tablas', async () => {
    const response = await axios.get(`${BASE_URL}/api/tabhinchable`);

    expect(Array.isArray(response.data.tabHinchable)).toBe(true);
});