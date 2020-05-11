import {
    OCCUPY_TOPIC_SUCCESS,
    TOPICS_ADD_SUCCESS,
    TOPICS_DELETE_SUCCESS,
    TOPICS_SET,
    TOPICS_UPDATE_SUCCESS,
} from '../actions/topic';

import Immutable from 'seamless-immutable';
import {fromPairs, omit} from 'lodash';


const topicReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case TOPICS_SET: {
            return Immutable.from(payload);
        }

        case TOPICS_ADD_SUCCESS: {
            return Immutable.merge(state, payload);
        }

        case TOPICS_DELETE_SUCCESS: {
            return Immutable.from(omit(state, payload));
        }

        case TOPICS_UPDATE_SUCCESS: {
            return Immutable.merge(state, fromPairs(payload), {deep: true});
        }

        case OCCUPY_TOPIC_SUCCESS: {
            const {user, topicId: newTopicId} = payload;
            const currentTopicId = user.topic;
            const fullName = [user.firstName, user.lastName].join(' ');

            const newTopicState = {
                [currentTopicId]: {
                    owner: null,
                    ownerLogin: null,
                },
                [newTopicId]: {
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
