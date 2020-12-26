const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const {
    AUTH_ERROR,
    DUPLICATE_LOGIN,
    DATABASE_ERROR,
} = require('../constants/http');


class UserService {
    static handleDatabaseOperation(func) {
        try {
            return func();
        } catch (e) {
            return {
                message: DATABASE_ERROR,
            };
        }
    }

    static async auth(body) {
        const { login, password } = body;


        const {
            message,
            ...user
        } = await UserService.handleDatabaseOperation(() => User.getByLogin(login));

        if (message) {
            return {message};
        }

        if (user && bcrypt.compareSync(password, user.hash)) {
            const token = jwt.sign({ sub: user.id }, secret);
            return {
                ...user.toJSON(),
                token,
            };
        }

        return { message: AUTH_ERROR };
    }

    static async register(body) {
        const { login } = body;

        const {
            message,
            exists,
        } = await UserService.handleDatabaseOperation(() => User.exists(login));

        if (message) {
            return {message};
        }

        if (exists) {
            return {
                message: DUPLICATE_LOGIN,
            };
        }

        const {
            msg,
        } = await UserService.handleDatabaseOperation(() => User.create(body));
        return {message: msg};
    }
}

module.exports = UserService;
