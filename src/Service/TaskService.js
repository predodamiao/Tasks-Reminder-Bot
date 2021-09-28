const repository = require("../Repository/TaskRepository")
const moment = require('moment')

exports.addTask = async ( date, task, chatId, type ) =>{
    r = await repository.addTask(date,task,chatId)
    if(r){
        if(type == 'private'){
            return 'Lembrarei você de '+task+' em '+ date
        }else{
            return 'Lembrarei vocês de '+task+' em '+ date
        }
    }else{
        return 'Ops... Algo saiu errado. Me passaram esse erro aqui: '+r
    }
}

exports.findAllTasks = async (chatId) => {
    let rows = await repository.findAllTasks(chatId)
    
    console.log(rows)

    if(rows=='false'){
        return 'Desculpa. Algo deu errado'
    }else if(rows.length == 0){
        return 'Sem tarefas! Vai aproveitar!'
    }else{
        t = 'Suas próximas tarefas são:\n\n'
        let tasks = JSON.parse(JSON.stringify(rows))
        tasks.forEach(task => {
            t += task.date +' - '+ task.task +'\n'
        });
        return t
    }
}

exports.findAllTasksWithId = async (chatId) => {
    let rows = await repository.findAllTasks(chatId)
    
    console.log(rows)

    if(rows=='false'){
        return 'Desculpa. Algo deu errado'
    }else if(rows.length == 0){
        return 'Sem tarefas.'
    }else{
        t = 'Suas tarefas salvas são:\n\n'
        let tasks = JSON.parse(JSON.stringify(rows))
        tasks.forEach(task => {
            t += task.id +' - '+ task.date +' - '+ task.task +'\n'
        });
        return t
    }
}

exports.findAllTasksToday = async (chatId) => {
    let today = moment(moment.now()).format('DD/MM/YYYY').toString()
    let rows = await repository.findAllTasksDay(chatId, today)
    if(rows=='false'){
        return 'Desculpa. Algo deu errado'
    }else if(rows.length == 0){
        return 'Sem tarefas hoje! Pode aproveitar!'
    }else{
        t = 'Suas tarefas para hoje são:\n\n'
        let tasks = JSON.parse(JSON.stringify(rows))
        tasks.forEach(task => {
            t += task.date +' - '+ task.task +'\n'
        });
        return t
    }
}

exports.findAllTasksDay = async (chatId, date) => {
    let rows = await repository.findAllTasksDay(chatId, date)


    if(rows=='false'){
        return 'Desculpa. Algo deu errado'
    }else if(rows.length == 0){
        return 'Sem tarefas em '+date+'! Pode aproveitar!'
    }else{
        t = 'Sua tarefas em '+date+' são:\n\n'
        let tasks = JSON.parse(JSON.stringify(rows))
        tasks.forEach(task => {
            t += task.date +' - '+ task.task +'\n'
        });
        return t
    }
}

exports.findAllChats = async () => {
    let r = await repository.findAllChats()
    let chats = JSON.parse(JSON.stringify(r))
    let t = new Array()
    chats.forEach(chatId => {
        t.push(chatId.chatId)
    });
    
    return t
}

exports.cleanOldTasks = () => {
    let today = moment.now()
    let yesterday = moment(today).subtract(1, 'day');
    yesterday = moment(yesterday).format('DD/MM/YYYY').toString()
    repository.cleanOldTasks(yesterday)
}

exports.deleteTask = async (id) => {
    repository.deleteTask(id)
}
