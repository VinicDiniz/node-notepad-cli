async function del(linhas, args) {
  const idx = parseInt(args[0], 10) - 1;
  if (!isNaN(idx) && idx >= 0 && idx < linhas.length) {
    linhas.splice(idx, 1);                     // remove um elemento
  } else {
    console.log('Índice inválido');
  }
}

module.exports = del;