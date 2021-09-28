const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

exports.getDB = async () => {
  try {
    const db = await sqlite.open({ filename: './src/Repository/database.db', driver: sqlite3.Database });
    return db;

  } catch (error) {
    console.log(error);
  }
}










/*
db = new sqlite3.Database('./src/Repository/database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected SQlite database.') ;
  })

*/