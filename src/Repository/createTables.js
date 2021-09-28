const database = require('./DB')

exports.createTables = async () => {
    let db = await database.getDB()
    db.run('' +
        'CREATE TABLE IF NOT EXISTS task(' +
        'id INTEGER PRIMARY KEY,' +
        'date TEXT,' +
        'task TEXT,' +
        'chatId TEXT' +
        ')', (err) => {
            if (err) {
                return console.error(err.message);
            }
        });

    db.close()

}