export default function validateCPF(CPF) {
  CPF = CPF.toString();
  CPF = CPF.replace(/[^0-9]/g, '');

  if (CPF.length !== 11) {
    return false;
  }

  if (CPF.replace(/^(\d)\1+$/, '') === '') {
    return false;
  }

  let codigo = CPF.substr(0, 9);

  let soma = 0;
  let numero_calculo = 10;
  for (let i = 0; i < 9; i++) {
    soma += (codigo[i] * numero_calculo--);
  }
  let $resto = soma%11;
  if ($resto < 2)
    codigo += "0";
  else
    codigo += (11 - $resto);

  soma = 0;
  numero_calculo = 11;
  for (let i = 0; i < 10; i++) {
    soma += (codigo[i] * numero_calculo--);
  }
  $resto = soma % 11;
  if ($resto < 2)
    codigo += "0";
  else
    codigo += (11 - $resto);

  if (codigo === CPF) {
    return true;
  } else {
    return false;
  }
}

