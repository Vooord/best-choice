const _ = require('lodash');
const Topic = require('../models/topic');

const {
    UNPROCESSABLE_ENTITY,
    EMPTY_TOPIC,
    TOPIC_TITLE_REQUIRED,
} = require('../constants/http');

/*
options:
    empty: 1 - ошибка, если передана пустая тема
    title: 1 - ошибка, если у темы не задан title
    exists: 1 - ошибка, если тема существует
returns:
    ok: {error: false}
    fail: {error: {status, message}}
NB:
    Если передан exists, но тема не имеет title, то проверка будет пропущена
 */
const validateTopics = async (topics, customOptions = {}) => {
    const defaultOptions = {exists: 1, empty: 1, title: 1};
    const options = {
        ...defaultOptions,
        ...customOptions,
    };


    for (const topic of topics) {
        if (options.empty && !_.size(topic)) {
            return { error: { status: UNPROCESSABLE_ENTITY, message: EMPTY_TOPIC } };
        }

        const { title } = topic;
        if (options.title && !title) {
            return { error: { status: UNPROCESSABLE_ENTITY, message: TOPIC_TITLE_REQUIRED } };
        }

        if (options.exists && title && await Topic.exists(title)) {
            return { error: { status: UNPROCESSABLE_ENTITY, message: `Topic "${title}" already exists` } };
        }
    }
    return {error: false};
};

module.exports = {
    validateTopics,
};
