const sql = require('../mode');

// функция-конструктор - используется, чтобы из данных тела запроса создать новый объект User
const User = function(newUser) {
    this.login = newUser.login;
    this.password = newUser.password;
    this.name = newUser.name;
    this.surname = newUser.surname;
};

// описание CRUD операций над базой
User.getAll = resultCallback => {
    sql.query('SELECT * FROM test_users', (err, res) => {
        if (err) {
            console.log('Error happened in User.getAll: ', err);
            resultCallback(err, null);
            return;
        }

        console.log('User.getAll res: ', res);
        resultCallback(null, res);
    });
};


module.exports = User;
