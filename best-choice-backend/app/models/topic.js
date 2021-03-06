const {TopicCollection} = require('../config/schema');
const _ = require('lodash');
const {NO_UPDATE_FIELDS_PASSED: NO_UPDATE_FIELDS} = require('../constants/http');


class Topic {
    constructor(newTopicFields) {
        // поля, которые сохраняются под тем же именем, как пришли в теле запроса
        const sameFields = ['title', 'description', 'group', 'adviser', 'owner'];
        return new TopicCollection(_.pick(newTopicFields, sameFields)).save();
    }

    // потому что populate есть только у TopicCollection, а из контроллера мы работает только с TopicModel (Topic)
    static populate(...args) {
        return TopicCollection.populate(...args);
    };

    static getById(id) {
        return TopicCollection.findById(id);
    }

    static getAll() {
        return TopicCollection.find({}, {'__v': false});
    }

    static getByTitle(title) {
        return TopicCollection.findOne({ title }, {'__v': false});
    }

    static getByOwnerId(owner) {
        return TopicCollection.findOne({ owner }, {'__v': false});
    }

    static getByGroup(group) {
        return TopicCollection.find({ group }, {'__v': false});
    };

    static exists(title) {
        return Topic.getByTitle(title).then(topic => (!!topic));
    }

    static updateByTitle(title, fields) {
        if (!_.size(fields)) {
            return Promise.reject(NO_UPDATE_FIELDS);
        }

        return TopicCollection.updateOne(
            { title },
            { $set: {
                ...fields,
            }}
        );
    }

    static updateById(id, fields) {
        if (!_.size(fields)) {
            return Promise.reject(NO_UPDATE_FIELDS);
        }

        return TopicCollection.updateOne(
            { _id: id },
            { $set: {
                ...fields,
            }}
        );
    }

    static deleteByTitle(title) {
        return TopicCollection.findOneAndDelete({title});
    }

    static deleteById(id) {
        return TopicCollection.findByIdAndDelete(id);
    }
}

module.exports = Topic;
