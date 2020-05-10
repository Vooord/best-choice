import {OCCUPY_TOPIC_SUCCESS, TOPICS_UPDATE} from '../actions/topic';

import Immutable from 'seamless-immutable';

const topicReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case TOPICS_UPDATE: {
            return Immutable.merge(state, payload);
        }

        case OCCUPY_TOPIC_SUCCESS: {
            const {owner, ownerLogin, title} = payload;
            const newTopicState = {
                [title]: {
                    ...state[title],
                    owner,
                    ownerLogin,
                },
            };
            return Immutable.merge(state, newTopicState);
        }

        default: {
            return state;
        }
    }
};

export default topicReducer;
