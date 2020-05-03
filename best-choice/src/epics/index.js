import authEpics from './auth';
import {combineEpics} from 'redux-observable';

const rootEpic = combineEpics(
    authEpics
);

export default rootEpic;
