const TelegramBot = require('node-telegram-bot-api')
const cron = require('node-cron')
const dotenv = require('dotenv');
const Task = require('./Resources/TaskController')
const Util = require('./Util')
const createTables = require('./Repository/createTables')

dotenv.config()

createTables.createTables();

const TOKEN = process.env.TELEGRAM_TOKEN

const bot = new TelegramBot(TOKEN, { polling: true })
Task.cleanOldTasks()
bot.on('message', (msg) => {
  
  let chatId, command, text, type
  ({ chatId, command, text, type } = Util.organize(msg))
  console.log("chatId:" + chatId)
  console.log("command:" + command)
  console.log("text:" + text)
  if(command !=''){
    switch(command.toUpperCase()){
      case 'ADDTASK': 
        Task.addTask(bot, chatId, text, type)
        break
      case 'ALLTASKS': 
        Task.findAllTasks(bot, chatId, text)
        break
      case 'ALLTASKSTODAY': 
        Task.findAllTasksToday(bot, chatId)
        break
      case 'DELETETASK': 
        Task.deleteTask(bot, chatId, text)
        break
    }
  }

});

bot.on("polling_error", (err) => console.log(err));

cron.schedule("0 7 * * *", () => {
  Task.todayCron(bot)
});

cron.schedule("0 23 * * *", () => {
  Task.todayCron(bot)
});

cron.schedule("1 0 * * *", () => {
  Task.cleanOldTasks()
});
