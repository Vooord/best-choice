const bcrypt = require('bcryptjs');
const _ = require('lodash');

const {UserCollection} = require('../config/schema');


class User {
    // принимает все тело запроса и описывает, что с ним делать
    constructor(reqBody) {
        // поля, которые сохраняются под тем же именем, как пришли в теле запроса
        const sameFields = ['login', 'firstName', 'lastName', 'midName', 'group', 'isAdmin'];
        const newUser = _.pick(reqBody, sameFields);

        const {password} = reqBody;
        newUser.hash = bcrypt.hashSync(password, 10);

        return new UserCollection(newUser);
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
            .then(user => (!!user));
    }

    static updateByLogin(login, fields) {
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
