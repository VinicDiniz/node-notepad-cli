const fs = require('fs').promises;
const path = require('path');

async function save(linhas, caminho) {
        const dir = path.dirname(caminho);
        console.log(dir);
        await fs.mkdir(dir, {recursive: true});

        await fs.writeFile(caminho, linhas.join('\n'), 'utf8');
        console.log(`Salvo em ${caminho}`);         // confirmação de salvamento  
}

module.exports = save;