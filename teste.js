#!/usr/bin/env node
const fs = require('fs').promises;
const readline = require('readline');

async function startEditor(filePath) {
  // 1) carrega o arquivo (ou buffer vazio)
  let content = '';
  try {
    content = await fs.readFile(filePath, 'utf8');
  } catch (err) {
    // se não existir, começa vazio
  }
  let linhas = content.split('\n');

  // 2) cria o interface do readline
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.setPrompt('> ');

  // 3) função pra desenhar na tela
  function exibeConteudo() {
    console.clear();
    console.log('=== EDITOR CLI ===');
    linhas.forEach((l, i) => {
      console.log(`${i + 1}: ${l}`);
    });
    console.log('Comandos: view | a <texto> | e <n> <texto> | d <n> | s | q');
  }

  // 4) exibe e inicia o prompt
  exibeConteudo();
  rl.prompt();

  // 5) loop de comandos
  rl.on('line', async (input) => {
    const [cmd, ...args] = input.trim().split(' ');
    switch (cmd) {
      case 'view':
        // só reexibe
        break;

      case 'a': // append
        linhas.push(args.join(' '));
        break;

      case 'e': // edit linha n
        {
          const idx = parseInt(args[0], 10) - 1;
          const txt = args.slice(1).join(' ');
          if (!isNaN(idx) && idx >= 0 && idx < linhas.length) {
            linhas[idx] = txt;
          } else {
            console.log('Índice inválido');
          }
        }
        break;

      case 'd': // delete linha n
        {
          const idx = parseInt(args[0], 10) - 1;
          if (!isNaN(idx) && idx >= 0 && idx < linhas.length) {
            linhas.splice(idx, 1);
          } else {
            console.log('Índice inválido');
          }
        }
        break;

      case 's': // save
        await fs.writeFile(filePath, linhas.join('\n'), 'utf8');
        console.log(`Salvo em ${filePath}`);
        break;

      case 'q': // quit
        rl.close();
        return;

      default:
        console.log('Comando não reconhecido');
    }

    // após cada comando: reexibe e re-prompt
    exibeConteudo();
    rl.prompt();
  });

  rl.on('close', () => {
    console.log('\nSaindo do editor');
    process.exit(0);
  });
}

// uso: node editor.js caminho/do/arquivo.txt
const [, , filePath] = process.argv;
if (!filePath) {
  console.error('Uso: node editor.js <caminho-do-arquivo>');
  process.exit(1);
}

startEditor(filePath);
