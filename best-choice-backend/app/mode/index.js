const mysql = require('mysql');
const dbConfig = require('../config/db.config');

// создаем соединение
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
});

// открываем наше соединение
connection.connect(err => {
    if (err) {
        throw error;
    }

    console.log(`Успешно соединено с базой: ${dbConfig.DB}\nТекущий пользователь: ${dbConfig.USER}\n`);
});

module.exports = connection;
