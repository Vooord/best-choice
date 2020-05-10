import {combineEpics, ofType} from 'redux-observable';
import {mergeMap, catchError} from 'rxjs/operators';
import {concat, from, of} from 'rxjs';

import {makeAuthHeader} from '../helpers/jwt';

import {
    OCCUPY_TOPIC_REQUEST,
    occupyTopicSuccess, occupyTopicFail,
} from '../actions/topic';
import {updateCurrentUser} from '../actions/user';


const occupyTopicEpic = (action$, state) =>
    action$.pipe(
        ofType(OCCUPY_TOPIC_REQUEST),
        mergeMap(({payload}) => {
            const title = payload;
            const {current} = state.value.user;

            return from(
                fetch('http://localhost:5000/topics/occupy', {
                    method: 'POST',
                    body: JSON.stringify({login: current.login, title}),
                    headers: {
                        'content-type': 'application/json',
                        ...makeAuthHeader(),
                    },
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }

                    return Promise.reject(response);
                })
            ).pipe(
                mergeMap(() => concat(
                    of(occupyTopicSuccess({user: current, title})),
                    of(updateCurrentUser({topic: title}))
                )),
                catchError(err => {
                    console.log('occupyTopicEpic err = ', err);
                    if (err.status) {
                        return of(occupyTopicFail(err.status));
                    }

                    return of(occupyTopicFail(err));
                })
            );
        })
    );

const topicEpic = combineEpics(
    occupyTopicEpic
);

export default topicEpic;
