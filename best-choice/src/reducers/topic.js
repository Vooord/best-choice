import {OCCUPY_TOPIC_SUCCESS, TOPICS_UPDATE} from '../actions/topic';

import Immutable from 'seamless-immutable';

const topicReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case TOPICS_UPDATE: {
            return Immutable.from(payload);
        }

        case OCCUPY_TOPIC_SUCCESS: {
            const {user, title: newTopic} = payload;
            const currentTopic = user.topic;
            const fullName = [user.firstName, user.lastName].join(' ');

            const newTopicState = {
                [currentTopic]: {
                    owner: null,
                    ownerLogin: null,
                },
                [newTopic]: {
                    owner: fullName,
                    ownerLogin: user.login,
                },
            };

            return Immutable.merge(state, newTopicState, {deep: true});
        }

        default: {
            return state;
        }
    }
};

export default topicReducer;
