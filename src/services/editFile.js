const readline = require('readline');               // importa módulo readline para I/O no terminal
const fs = require('fs').promises;                  // importa a API de promises do fs para leitura/gravação
const path = require('path');
const runCommand = require('../commands');

// cria uma única interface readline compartilhada
const rl = readline.createInterface({
  input: process.stdin,                            // lê entrada do teclado
  output: process.stdout                           // escreve saída no terminal
});

async function editFile(data, caminho) {
  // transforma a string 'data' em array de linhas apenas se houver conteúdo de fato
  // se 'data' for vazia ou só espaços, inicia com array vazio
  const linhas = (data && data.trim().length > 0)
    ? data.split('\n')
    : [];

  // configura o prompt (texto que aparece antes do cursor)
  rl.setPrompt('> ');

  // função que redesenha o editor no terminal
  function exibeConteudo() {
    console.clear();                               // limpa a tela
    console.log(caminho);
    console.log('=== EDITOR CLI ===');              // título do editor
    linhas.forEach((l, i) => {                     // para cada linha
      console.log(`${i + 1}: ${l}`);               // imprime número e texto
    });
    // mostra os comandos disponíveis
    console.log('Comandos: view | a <texto> | e <n> <texto> | d <n> | s | q');
  }

  // primeira renderização e exibição do prompt
  exibeConteudo();
  rl.prompt();

  // loop de leitura de comandos: dispara a cada Enter pressionado
  rl.on('line', async (input) => {
    const [cmd, ...args] = input.trim().split(' '); // separa comando e argumentos

    await runCommand(cmd, linhas, args, caminho, rl);

    // Se o comando foi quit, não redesenha nem continua
    if (cmd === 'q') {
      console.clear();
      return;
    }
    // após processar o comando, redesenha e exibe o prompt novamente
    exibeConteudo();
    rl.prompt();
  });
}

// exporta a função editFile para ser usada em outros módulos
module.exports = editFile;
