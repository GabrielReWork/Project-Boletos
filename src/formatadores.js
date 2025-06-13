function formatCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatCNPJ(cnpj) {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

function formatarDocumento(doc) {
  if (!doc) return '';

  const apenasDigitos = doc.replace(/\D/g, '');
  if (apenasDigitos.length === 11) return formatCPF(apenasDigitos);
  if (apenasDigitos.length === 14) return formatCNPJ(apenasDigitos);
  return doc; // Caso não seja CPF nem CNPJ, retorna como está
}

module.exports = {
  formatCPF,
  formatCNPJ,
  formatarDocumento
};
