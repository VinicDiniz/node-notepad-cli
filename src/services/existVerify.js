const fs = require('fs');               // importa módulo fs para operações de arquivo
const readFile = require('./readFile'); // módulo que lê o arquivo e inicia o editor
const editFile = require('./editFile'); // módulo que exibe o editor CLI

// Função que verifica se o arquivo existe e decide o fluxo de edição
const existVerify = (args) => {
  // args é o caminho do arquivo passado pela linha de comando

  if (!fs.existsSync(args)) {
    // se o arquivo NÃO existe em disco
    let data = '';        // inicializa data como string vazia
    editFile(data, args); // chama o editor com conteúdo vazio para criar um novo arquivo
  } else {
    // se o arquivo existe
    readFile.lerArquivo(args); // lê o arquivo existente e, em seguida, abre no editor
  }
};

module.exports = {
  existVerify // exporta a função existVerify para uso em outros módulos
};
