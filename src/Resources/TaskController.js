const service = require("../Service/TaskService")
const moment = require('moment')
const Util = require('../Util')

exports.addTask = async (bot, chatId, text, type) => {
    let r
    let regexDate = /([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})(.*)/g
    let result = regexDate.exec(text)
    if (result == null) {
        r = 'Digita uma data ai! Eu não sou mágico pra adivinhar caramba!'
        Util.sendMessage(bot, chatId, r)
        return
    }
    let task = result[4]
    let date = result[1].padStart(2, '0') + '/' + result[2].padStart(2, '0') + '/' + result[3];
    if (moment(date, 'DD/MM/YYYY').isValid()) {
        let today = moment.now()
        let taskDate = moment(date, 'DD/MM/YYYY')
        if(taskDate.isBefore(today)){
            r = 'Ops... Essa data já passou meu parça'
            Util.sendMessage(bot, chatId, r)
            return
        }
        if (task == '') {
            r = 'Você tá de brincadeira?? Digita alguma tarefa junto com a data!'
            Util.sendMessage(bot, chatId, r)
            return
        }
        r = await service.addTask(date, task, chatId, type)

    } else {
        r = 'Essa data tá estranha. Presta atenção na hora de digitar poh!'
    }
    Util.sendMessage(bot, chatId, r)
}

exports.findAllTasks = async (bot, chatId, text) => {
    let regexDate = /([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})(.*)/g
    let result = regexDate.exec(text)
    if (result == null) {
        let r = await service.findAllTasks(chatId)
        Util.sendMessage(bot, chatId, r)
        return
    }
    let date = result[1].padStart(2, '0') + '/' + result[2].padStart(2, '0') + '/' + result[3];
    if (moment(date, 'DD/MM/YYYY').isValid()) {
        r = service.findAllTasksDay(chatId, date)
    } else {
        r = 'Essa data tá estranha. Presta atenção na hora de digitar poh!'
    }
    Util.sendMessage(bot, chatId, r)
}


exports.findAllTasksToday = async (bot, chatId) => {
    let r = await service.findAllTasksToday(chatId)
    Util.sendMessage(bot, chatId, r)
}

exports.todayCron = async (bot) => {
    let r = await service.findAllChats()
    r.forEach(async chat => {
        let m = await service.findAllTasksToday(chat)
        Util.sendMessage(bot, chat, m)

    });
}

exports.cleanOldTasks = () => {
    service.cleanOldTasks()
}

exports.deleteTask = async (bot, chatId, text) => {
    let regexNumber = /([0-9]+)/g
    let result = regexNumber.exec(text)
    if (result == null) {
        let r = await service.findAllTasksWithId(chatId)
        Util.sendMessage(bot, chatId, r)
        return
    }else{
        let taskId = result[0]
        console.log('text' + text)
        console.log('id to delete' + taskId)
        let r = await service.deleteTask(taskId)
        return
    }
}

