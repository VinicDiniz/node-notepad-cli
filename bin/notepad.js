// Importa o módulo responsável por verificar se o arquivo existe
const ExistVerify = require('../src/services/existVerify');

// Lê o terceiro item do array process.argv, que é o primeiro argumento
// passado pelo usuário após "node script.js"
const args = process.argv.slice(2);

if (args.length === 0) {
    console.error('Parâmetro não encontrado: Use node <script> <diretório/arquivo.txt>');
    process.exit(1);
}
// Imprime no console o valor do argumento recebido (caminho do arquivo)
console.log(args);

// Executa a função existVerify, que:
// - verifica se o arquivo existe em disco
// - se existir, carrega e abre para edição
// - se não existir, inicia o editor com conteúdo vazio
ExistVerify.existVerify(args);
