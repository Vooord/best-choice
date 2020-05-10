import authEpics from './auth';
import registerEpics from './register';
import topicEpic from './topic';
import userEpic from './user';
import {combineEpics} from 'redux-observable';


const rootEpic = combineEpics(
    authEpics,
    registerEpics,
    topicEpic,
    userEpic
);

export default rootEpic;
