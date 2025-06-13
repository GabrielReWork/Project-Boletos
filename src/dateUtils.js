function parseData(dataStr) {
  if (dataStr.includes('/')) {
    const [dia, mes, ano] = dataStr.split('/').map(Number);
    return new Date(ano, mes - 1, dia);
  }
  return new Date(dataStr);
}

function isDiaUtil(date) {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

function formatData(date, formato = 'ISO') {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();

  if (formato === 'BR') return `${dia}/${mes}/${ano}`;
  return `${ano}-${mes}-${dia}`;
}

function getDiasUteisAntesEDepois(dataStr, qtdAntes = 5, qtdDepois = 3, formato = 'ISO') {
  const base = parseData(dataStr);

  const uteisAntes = [];
  let diaAntes = new Date(base);
  diaAntes.setDate(diaAntes.getDate() - 1);
  while (uteisAntes.length < qtdAntes) {
    if (isDiaUtil(diaAntes)) {
      uteisAntes.push(formatData(diaAntes, formato));
    }
    diaAntes.setDate(diaAntes.getDate() - 1);
  }
  uteisAntes.reverse();

  const uteisDepois = [];
  let diaDepois = new Date(base);
  diaDepois.setDate(diaDepois.getDate() + 1);
  while (uteisDepois.length < qtdDepois) {
    if (isDiaUtil(diaDepois)) {
      uteisDepois.push(formatData(diaDepois, formato));
    }
    diaDepois.setDate(diaDepois.getDate() + 1);
  }

  return { uteisAntes, uteisDepois };
}

module.exports = {
  parseData,
  isDiaUtil,
  formatData,
  getDiasUteisAntesEDepois
};
