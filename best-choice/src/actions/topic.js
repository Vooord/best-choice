import {createAction} from '../helpers/actions';

export const TOPICS_UPDATE = 'topic/TOPICS_UPDATE';
export const OCCUPY_TOPIC_REQUEST = 'epic/OCCUPY_TOPIC_REQUEST';
export const OCCUPY_TOPIC_SUCCESS = 'epic/OCCUPY_TOPIC_SUCCESS';
export const OCCUPY_TOPIC_FAIL = 'epic/OCCUPY_TOPIC_SUCCESS';

export const {
    [TOPICS_UPDATE]: updateTopics,
    [OCCUPY_TOPIC_REQUEST]: occupyTopic,
    [OCCUPY_TOPIC_SUCCESS]: occupyTopicSuccess,
    [OCCUPY_TOPIC_FAIL]: occupyTopicFail,
} = {
    [TOPICS_UPDATE]: payload => createAction(TOPICS_UPDATE, payload),
    [OCCUPY_TOPIC_REQUEST]: payload => createAction(OCCUPY_TOPIC_REQUEST, payload),
    [OCCUPY_TOPIC_SUCCESS]: payload => createAction(OCCUPY_TOPIC_SUCCESS, payload),
    [OCCUPY_TOPIC_FAIL]: payload => createAction(OCCUPY_TOPIC_FAIL, payload),
};
