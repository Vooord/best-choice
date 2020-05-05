const {AdviserCollection} = require('../config/schema');

const _ = require('lodash');


class Adviser {
    constructor(newAdviserFields) {
        // поля, которые сохраняются под тем же именем, как пришли в теле запроса
        const sameFields = ['uid', 'firstName', 'lastName', 'midName', 'topics'];
        return new AdviserCollection(_.pick(newAdviserFields, sameFields)).save();
    }

    static getById(id) {
        return AdviserCollection.findById(id);
    }

    static getAll() {
        return AdviserCollection.find({}, {'__v': false});
    }

    static getByUid(uid) {
        return AdviserCollection.findOne({ uid }, {'__v': false});
    }

    static exists(uid) {
        return AdviserCollection.findOne({ uid }, {'__v': false})
            .then(adviser => (!!adviser));
    }
}

module.exports = Adviser;


