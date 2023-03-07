const readline = require('readline');

const teclado = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

teclado.question('Digite o valor da altura: ', (altura) => {
  teclado.question('Digite o valor da largura: ', (largura) => {
    let area = parseInt(altura) * parseInt(largura);
    console.log("A área é: %s", area);
    console.log(parseFloat(altura) == parseFloat(largura) ? 'Quadrado' : 'Retângulo');
    teclado.close();
  });
});
