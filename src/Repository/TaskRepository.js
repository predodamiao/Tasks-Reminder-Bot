const db = require("./DB")
const util = require('util')

exports.addTask = async (date, task, chatId) => {
    let database = await db.getDB()
    let result = await database.run('INSERT INTO task(date,task,chatId) VALUES ("' + date + '","' + task + '","' + chatId + '")', (err) => {
        if (err) {
            console.log(err)
            return 'false'
        }
    })
    database.close()
    return result
}

exports.findAllTasks = async (chatId) => {
    let database = await db.getDB()
    try {
        let result = await database.all('SELECT * FROM task WHERE chatId = "' + chatId + '" ORDER BY date', async (err, rows) => {
            if (err) {
                console.log(err)
            }
        })
        database.close()
        return result
    } catch (err) {
        console.log(err)
    }

}
exports.findAllTasksDay = async (chatId, date) => {
    let database = await db.getDB()
    let sql = 'SELECT * FROM task WHERE chatId = "' + chatId + '" AND date = "'+date+'"'
    try {
        let result = await database.all(sql, async (err, rows) => {
            if (err) {
                console.log(err)
            }
        })
        database.close()
        console.log(result)
        return result
    } catch (err) {
        console.log(err)
    }
}

exports.findAllChats = async () => {
    let database = await db.getDB()
    let today = moment(moment.now()).format('DD/MM/YYYY').toString()
    let sql = 'SELECT DISTINCT chatId FROM task WHERE date = "'+today+'"'
    try {
        let result = await database.all(sql, async (err, rows) => {
            if (err) {
                console.log(err)
            }
        })
        database.close()
        return result
    } catch (err) {
        console.log(err)
    }
}

exports.cleanOldTasks = async (date) => {
    let database = await db.getDB()
    let sql = 'DELETE FROM task WHERE date = "'+date+'"'
    console.log(sql)
    try {
        let result = await database.all(sql, async (err, rows) => {
            if (err) {
                console.log(err)
            }
        })
        database.close()
        return result
    } catch (err) {
        console.log(err)
    }
}


exports.deleteTask = async (id) => {
    let database = await db.getDB()
    let sql = 'DELETE FROM task WHERE id = "'+id+'"'
    console.log(sql)
    try {
        let result = await database.all(sql, async (err, rows) => {
            if (err) {
                console.log(err)
            }
        })
        database.close()
        return result
    } catch (err) {
        console.log(err)
    }
}





