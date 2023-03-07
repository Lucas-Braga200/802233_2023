const readline = require('readline');

const teclado = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

teclado.question('Digite o preço do produto: ', (preco) => {
  teclado.question('Digite a quantidade: ', (quantidade) => {
    teclado.question('Digite o valor do desconto: ', (descontoPorcentagem) => {
      let desconto = (1 - parseFloat(descontoPorcentagem) / 100);
      let total = parseFloat(preco) * parseFloat(quantidade) * desconto;
      console.log("O preço total é: %s", total);
      teclado.close();
    });
  });
});
