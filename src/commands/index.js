const view = require('./view');
const add = require('./add');
const edit = require('./edit');
const del = require('./delete');
const save = require('./save');
const quit = require('./quit');

module.exports = async function runCommand(cmd, linhas, args, caminho, rl) {
  switch (cmd) {
    case 'view': return view(linhas);
    case 'a': return add(linhas, args);
    case 'e': return edit(linhas, args);
    case 'd': return del(linhas, args);
    case 's': return save(linhas, caminho);
    case 'q': return quit(rl);
    default: console.log('Comando não reconhecido');
  }
};
