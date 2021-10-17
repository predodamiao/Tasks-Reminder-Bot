# Tasks Reminder Bot

## Sobre
Bot desenvolvido para gerenciar as tarefas  e enviar avisos em horários pré-definidos lembrando das mesmas utilizando o Telegram.

## Tecnologias
- [Node.js](https://nodejs.org/en/)
- [SQLite](https://www.npmjs.com/package/sqlite)


## Requisitos

- [NodeJS](https://nodejs.org/en/)
- Editor de Textos ou IDE ([VSCode](https://code.visualstudio.com) recomendado)

Após cumprir os requisitos, você vai precisar:

- clonar este repositório
```
git clone https://github.com/predodamiao/Tasks-Reminder-Bot.git
```
- Criar uma chave de bot no Telegram:

1) Entrar no Telegram
2) Procurar pelo BotFather
3) Enviar o comando ```/newbot```
4) Definir o nome do seu bot
5) Salvar o token gerado e adicionar no arquivo ```./src/index.js```

## Como rodar

```
npm install
npm run start
```

# Próximos passos

- [ ] Migrar de SQLite para MongoDB
- [X] Adicionar .env
- [ ] Identificar possíveis novos comandos
- [ ] Disponibilizar para o público em geral

# License
[MIT License](https://github.com/predodamiao/Tasks-Reminder-Bot/blob/main/LICENSE)