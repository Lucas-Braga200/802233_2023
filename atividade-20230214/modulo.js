function media(vetor) {
  soma = vetor.reduce(
    (acumulador, valor) => acumulador + valor, 0
  );
  return soma / vetor.length;
}

function menor(vetor) {
  let menor = null;

  menor = vetor[0];

  vetor.forEach(valor => {
    if (valor < menor) {
      menor = valor;
    }
  });

  return menor;
}

function maior(vetor) {
  let maior = null;

  maior = vetor[0];

  vetor.forEach(valor => {
    if (valor > maior) {
      maior = valor;
    }
  });

  return maior;
}

module.exports = {
  media, menor, maior
};
