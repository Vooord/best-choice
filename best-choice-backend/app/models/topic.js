const {TopicCollection} = require('../config/schema');
const _ = require('lodash');


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

    static getByGroup(group) {
        return TopicCollection.find({ group }, {'__v': false});
    };

    static exists(title) {
        return TopicCollection.findOne({ title })
            .then(topic => (!!topic));
    }

    static updateByTitle(title, fields) {
        if (!_.size(fields)) {
            return Promise.reject('Cannot update with no fields passed');
        }

        return TopicCollection.updateOne(
            { title },
            { $set: {
                ...fields,
            }}
        );
    }

}

module.exports = Topic;
