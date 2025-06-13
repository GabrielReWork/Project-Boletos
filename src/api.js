const axios = require('axios');

async function buscarBoletosNaoPagos(headers) {
  const url = 'https://api.sigecloud.com.br/request/Boletos/Pesquisar?pago=false';

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = { buscarBoletosNaoPagos };
    