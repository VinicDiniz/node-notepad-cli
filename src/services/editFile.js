const readline = require('readline');               // importa módulo readline para I/O no terminal
const fs = require('fs').promises;                  // importa a API de promises do fs para leitura/gravação
const path = require('path');

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

    switch (cmd) {
      case 'view':
        // apenas reexibe o buffer sem alterar nada
        break;

      case 'a': // append: adiciona nova linha ao fim
        linhas.push(args.join(' '));
        break;

      case 'e': { // edit: substitui conteúdo da linha n
        const idx = parseInt(args[0], 10) - 1;       // converte para índice zero‑based
        const txt = args.slice(1).join(' ');
        if (!isNaN(idx) && idx >= 0 && idx < linhas.length) {
          linhas[idx] = txt;                         // atualiza a linha
        } else {
          console.log('Índice inválido');            // alerta se índice fora do intervalo
        }
        break;
      }

      case 'd': { // delete: remove a linha n
        const idx = parseInt(args[0], 10) - 1;
        if (!isNaN(idx) && idx >= 0 && idx < linhas.length) {
          linhas.splice(idx, 1);                     // remove um elemento
        } else {
          console.log('Índice inválido');
        }
        break;
      }

      case 's': // save: grava o conteúdo atual no arquivo

        const dir = path.dirname(caminho);
        console.log(dir);
        await fs.mkdir(dir, {recursive: true});

        await fs.writeFile(caminho, linhas.join('\n'), 'utf8');
        console.log(`Salvo em ${caminho}`);         // confirmação de salvamento
        break;

      case 'q': // quit: fecha o editor e sai do processo
        rl.close();
        return;                                     

      default:
        console.log('Comando não reconhecido');     // aviso para comandos inválidos
    }

    // após processar o comando, redesenha e exibe o prompt novamente
    exibeConteudo();
    rl.prompt();
  });
}

// exporta a função editFile para ser usada em outros módulos
module.exports = editFile;
