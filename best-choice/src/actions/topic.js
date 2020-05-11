import {createAction} from '../helpers/actions';

export const TOPICS_UPDATE = 'topic/TOPICS_UPDATE';
export const TOPICS_UPDATE_SUCCESS = 'topic/TOPICS_UPDATE_SUCCESS';
export const TOPICS_UPDATE_FAIL = 'topic/TOPICS_UPDATE_FAIL';

export const TOPICS_ADD = 'topic/TOPICS_ADD';
export const TOPICS_ADD_SUCCESS = 'topic/TOPICS_ADD_SUCCESS';
export const TOPICS_ADD_FAIL = 'topic/TOPICS_ADD_FAIL';

export const TOPICS_DELETE = 'topic/TOPICS_DELETE';
export const TOPICS_DELETE_SUCCESS = 'topic/TOPICS_DELETE_SUCCESS';
export const TOPICS_DELETE_FAIL = 'topic/TOPICS_DELETE_FAIL';

export const TOPICS_SET = 'topic/TOPICS_SET';

export const OCCUPY_TOPIC_REQUEST = 'epic/OCCUPY_TOPIC_REQUEST';
export const OCCUPY_TOPIC_SUCCESS = 'epic/OCCUPY_TOPIC_SUCCESS';
export const OCCUPY_TOPIC_FAIL = 'epic/OCCUPY_TOPIC_SUCCESS';

export const {
    [TOPICS_UPDATE]: updateTopics,
    [TOPICS_UPDATE_SUCCESS]: updateTopicsSuccess,
    [TOPICS_UPDATE_FAIL]: updateTopicsFail,

    [TOPICS_ADD]: addTopics,
    [TOPICS_ADD_SUCCESS]: addTopicsSuccess,
    [TOPICS_ADD_FAIL]: addTopicsFail,

    [TOPICS_DELETE]: deleteTopics,
    [TOPICS_DELETE_SUCCESS]: deleteTopicsSuccess,
    [TOPICS_DELETE_FAIL]: deleteTopicsFail,

    [TOPICS_SET]: setTopics,

    [OCCUPY_TOPIC_REQUEST]: occupyTopic,
    [OCCUPY_TOPIC_SUCCESS]: occupyTopicSuccess,
    [OCCUPY_TOPIC_FAIL]: occupyTopicFail,
} = {
    [TOPICS_UPDATE]: payload => createAction(TOPICS_UPDATE, payload),
    [TOPICS_UPDATE_SUCCESS]: payload => createAction(TOPICS_UPDATE_SUCCESS, payload),
    [TOPICS_UPDATE_FAIL]: payload => createAction(TOPICS_UPDATE_FAIL, payload),

    [TOPICS_ADD]: payload => createAction(TOPICS_ADD, payload),
    [TOPICS_ADD_SUCCESS]: payload => createAction(TOPICS_ADD_SUCCESS, payload),
    [TOPICS_ADD_FAIL]: payload => createAction(TOPICS_ADD_FAIL, payload),

    [TOPICS_DELETE]: payload => createAction(TOPICS_DELETE, payload),
    [TOPICS_DELETE_SUCCESS]: payload => createAction(TOPICS_DELETE_SUCCESS, payload),
    [TOPICS_DELETE_FAIL]: payload => createAction(TOPICS_DELETE_FAIL, payload),

    [TOPICS_SET]: payload => createAction(TOPICS_SET, payload),

    [OCCUPY_TOPIC_REQUEST]: payload => createAction(OCCUPY_TOPIC_REQUEST, payload),
    [OCCUPY_TOPIC_SUCCESS]: payload => createAction(OCCUPY_TOPIC_SUCCESS, payload),
    [OCCUPY_TOPIC_FAIL]: payload => createAction(OCCUPY_TOPIC_FAIL, payload),
};
