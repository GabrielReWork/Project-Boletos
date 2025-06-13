require('dotenv').config();
const { buscarBoletosNaoPagos } = require('./api');
const { parseData, formatData, getDiasUteisAntesEDepois } = require('./dateUtils');
const { formatarDocumento } = require('./formatadores');

async function main() {
  const headers = {
    'Authorization-Token': process.env.SIGE_TOKEN,
    'User': process.env.SIGE_USER,
    'App': process.env.SIGE_APP
  };

  try {
    const boletos = await buscarBoletosNaoPagos(headers);

    if (!Array.isArray(boletos) || boletos.length === 0) {
      console.log('Nenhum boleto em aberto encontrado.');
      return;
    }

    const ultimos5Boletos = boletos.slice(-5);

    ultimos5Boletos.forEach((boleto, i) => {
      const vencFormatado = formatData(parseData(boleto.DataVencimento), 'ISO');
      const cpfCnpjFormatado = formatarDocumento(boleto.CPF_CNPJSacado);

      const { uteisAntes, uteisDepois } = getDiasUteisAntesEDepois(
        boleto.DataVencimento,
        3,
        5,
        'ISO'
      );

      console.log('\n-----------------------------------');
      console.log(`Boleto #${i + 1}`);
      console.log(`Nome: ${boleto.Sacado}`);
      console.log(`Vencimento: ${vencFormatado}`);
      console.log(`Pago: ${boleto.Pago}`);
      console.log(`CPF/CNPJ: ${cpfCnpjFormatado}`);
      console.log(`3 dias úteis antes: ${uteisAntes.join(', ')}`);
      console.log(`5 dias úteis depois: ${uteisDepois.join(', ')}`);
      console.log('-----------------------------------');
    });

  } catch (error) {
    console.error('Erro ao buscar boletos:', error.message);
    if (error.response) {
      console.error('Resposta da API:', error.response.data);
    }
  }
}

main();
