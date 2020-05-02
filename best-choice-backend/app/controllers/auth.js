const User = require('../models/user.model');

const DEFAULT_ERROR = 'Во время авторизации произошла внутренняя ошибка сервера, повторите попытку позже';
const USER_NOT_FOUND_ERROR = 'Неверный логин или пароль';

exports.makeAuth = (req, res) => {
    const {login, password} = req.body;

    User.getAll((err, users) => {
        if (err) {
            return res.status(500).json({
                error: true,
                message: err.message || DEFAULT_ERROR,
            });
        }

        for (const user of users) {
            if (user.login === login && user.password === password) {
                return res.json({
                    error: false,
                    result: 'ok',
                });
            }
        }

        return res.json({
            error: true,
            message: USER_NOT_FOUND_ERROR,
        });
    });
};
