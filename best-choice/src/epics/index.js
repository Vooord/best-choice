import authEpics from './auth';
import registerEpics from './register';
import {combineEpics} from 'redux-observable';

const rootEpic = combineEpics(
    authEpics,
    registerEpics
);

export default rootEpic;
