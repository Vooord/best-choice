import userReducer from './user';
import errorReducer from './error';
import topicReducer from './topic';

const reducers = {
    user: userReducer,
    error: errorReducer,
    topic: topicReducer,
};

export default reducers;
