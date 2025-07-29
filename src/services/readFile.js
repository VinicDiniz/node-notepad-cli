// importa a API de promises do fs para usar async/await nas operações de arquivo
const fs = require('fs').promises;

// importa a função que abre o editor CLI com o conteúdo recebido
const editFile = require('./editFile');

// função assíncrona que lê o arquivo no caminho indicado e o envia para edição
async function lerArquivo(caminho) {
  try {
    // tenta ler o arquivo como texto UTF-8
    const data = await fs.readFile(caminho, 'utf8');
    // chama o editor passando o conteúdo lido e o caminho original do arquivo
    editFile(data, caminho);
  } catch (err) {
    // caso ocorra erro ao ler (arquivo não existe, permissão, etc.), exibe mensagem e encerra o processo
    console.error('❌ Erro ao ler o arquivo:', err.message);
    process.exit(1);
  }
}

// exporta a função lerArquivo para ser usada em outros módulos
module.exports = {
    lerArquivo
};
