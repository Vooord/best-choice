const bcrypt = require('bcryptjs');
const _ = require('lodash');
const {NO_UPDATE_FIELDS_PASSED} = require('../constants/http');

const {UserCollection} = require('../config/schema');


class User {
    // принимает все тело запроса и описывает, что с ним делать
    static async create(newUserFields) {
        // поля, которые сохраняются под тем же именем, как пришли в теле запроса
        const sameFields = ['login', 'firstName', 'lastName', 'midName', 'group', 'isAdmin'];
        const newUser = _.pick(newUserFields, sameFields);

        const {password} = newUserFields;
        newUser.hash = bcrypt.hashSync(password, 10);

        return new UserCollection(newUser).save();
    }

    static getById(id) {
        return UserCollection.findById(id);
    }

    static getAll() {
        return UserCollection.find();
    }

    static getByLogin(login) {
        return UserCollection.findOne({ login });
    }

    static exists(login) {
        return UserCollection.findOne({ login })
            .then(user => {
                exists: !!user;
            });
    }

    static updateByLogin(login, fields) {
        if (!_.size(fields)) {
            return Promise.reject(NO_UPDATE_FIELDS_PASSED);
        }

        return UserCollection.updateOne(
            { login },
            { $set: {
                ...fields,
            }}
        );
    }

    static deleteByLogin(login) {
        return UserCollection.findOneAndDelete({login});
    }
}

module.exports = User;
