const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const _ = require('lodash');

const {secret} = require('../config/db');
const User = require('../models/user');
const Topic = require('../models/topic');

const {
    AUTH_ERROR, UNAUTHORIZED,
    DUPLICATE_LOGIN, UNPROCESSABLE_ENTITY,
    NOT_FOUND,
    USER_NOT_FOUND,
} = require('../constants/http');


class UserController {
    static async auth(req, res) {
        const { login, password } = req.body;
        const user = await User.getByLogin(login);

        if (user && bcrypt.compareSync(password, user.hash)) {
            const token = jwt.sign({ sub: user.id }, secret);
            return res.json({
                ...user.toJSON(),
                token,
            });
        }

        return res.status(UNAUTHORIZED).json({ message: AUTH_ERROR });
    };

    static async register (req, res) {
        const { login } = req.body;

        if (await User.exists(login)) {
            return res.status(UNPROCESSABLE_ENTITY).json({ message: DUPLICATE_LOGIN });
        }

        await new User(req.body);
        return res.json({});
    };

    static async getAll (req, res) {
        const users = await User.getAll();
        return res.json(users);
    };

    // вернись потом

    static async getById(id) {
        return await User.getById(id);
    }

    static async getByLogin (req, res) {
        const user = await User.getByLogin(req.params.login);
        if (user) {
            return res.json(user);
        }

        return res.status(NOT_FOUND).json({ message: USER_NOT_FOUND });
    };

    static async getCurrent (req, res) {
        const currentUser = await User.getById(req.user.sub);
        if (currentUser) {
            const currentTopic = await Topic.getByOwnerId(currentUser._id);
            return res.json({
                ...currentUser.toJSON(),
                topic: (currentTopic && currentTopic._id) || null,
            });
        }

        return res.status(NOT_FOUND).json({ message: USER_NOT_FOUND });
    }

    static async update (req, res) {
        const {login} = req.params;
        if (!await User.exists(login)) {
            return res.status(NOT_FOUND).json({ message: USER_NOT_FOUND });
        }

        // поля которые 1) можно обновлять, 2) в тело передаются под тем же именем, что лежат в таблице
        const editableFields = ['firstName', 'lastName', 'group'];
        const updatedFields = _.pick(req.body, editableFields);

        // шифруем пароль
        const {password} = req.body;
        if (password) {
            updatedFields.hash = bcrypt.hashSync(password, 10);
        }

        await User.updateByLogin(login, updatedFields);

        return res.json({});
    };

    static async deleteByLogin(req, res) {
        try {
            await User.deleteByLogin(req.params.login);
            return res.json({});
        } catch(err) {
            return res.status(NOT_FOUND).json({ message: USER_NOT_FOUND });
        }
    };
}


module.exports = UserController;
