async function edit(linhas, args) {
  const idx = parseInt(args[0], 10) - 1;       // converte para índice zero‑based
  const txt = args.slice(1).join(' ');
  if (!isNaN(idx) && idx >= 0 && idx < linhas.length) {
    linhas[idx] = txt;                         // atualiza a linha
  } else {
    console.log('Índice inválido');            // alerta se índice fora do intervalo
  }
}

module.exports = edit;