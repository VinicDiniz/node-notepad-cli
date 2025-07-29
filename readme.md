# Mini Notepad CLI

Um editor de texto simples e interativo no terminal, implementado em Node.js. Permite criar, abrir e editar arquivos `.txt` diretamente na linha de comando, sem sair do terminal.

## Estrutura do Projeto

```bash
├── bin/
│   └── notepad.js           # Entry point da CLI (shebang e parsing de args)
├── src/
│   └── services/
│       ├── exitVerify.js    # Verifica existência do arquivo e direciona fluxo
│       ├── readFile.js      # Lê arquivo e chama editor
│       └── editFile.js      # Editor interativo no terminal (add/edit/delete/save)
└── package.json             # Dependências e script de instalação
```

## Requisitos

* Node.js v12+ (testado em v14+)
* npm (gerenciador de pacotes)

## Uso

Abra ou crie um arquivo para editar:

```bash
node bin/notepad.js <caminho/para/arquivo.txt>
```

### Comandos Interativos

| Comando         | Descrição                                              |
| --------------- | ------------------------------------------------------ |
| `view`          | Reexibe o conteúdo atual sem alterações                |
| `a <texto>`     | Adiciona uma nova linha ao final com o texto informado |
| `e <n> <texto>` | Edita a linha número `n`, substituindo pelo novo texto |
| `d <n>`         | Remove a linha número `n`                              |
| `s`             | Salva o conteúdo atual de volta no arquivo (`.txt`)    |
| `q`             | Sai do editor (sem salvar se não tiver usado `s`)      |

## Exemplos

1. Criar um novo arquivo:

   ```bash
   notepad notas.txt
   # Inicia editor com buffer vazio
   > a Minha primeira nota
   > s
   > q
   ```

2. Editar um arquivo existente:

   ```bash
   notepad notas.txt
   # Carrega conteúdo salvo anteriormente
   1: Minha primeira nota
   > e 1 Nota atualizada!
   > s
   > q
   ```

