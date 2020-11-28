import {combineEpics, ofType} from 'redux-observable';
import {mergeMap, catchError} from 'rxjs/operators';
import {concat, from, of} from 'rxjs';

import {makeAuthHeader} from '../helpers/jwt';

import {
    OCCUPY_TOPIC_REQUEST, occupyTopicSuccess, occupyTopicFail,
    TOPICS_UPDATE, updateTopicsSuccess, updateTopicsFail,
    TOPICS_ADD, addTopicsSuccess, addTopicsFail,
    TOPICS_DELETE, deleteTopicsSuccess, deleteTopicsFail,
} from '../actions/topic';
import {updateCurrentUser} from '../actions/user';
import { toast } from 'react-toastify';


const occupyTopicEpic = (action$, state) =>
    action$.pipe(
        ofType(OCCUPY_TOPIC_REQUEST),
        mergeMap(({payload}) => {
            const topicId = payload;
            console.log('topicId = ', topicId);
            const {current} = state.value.user;

            return from(
                fetch('http://localhost:5000/topics/occupy', {
                    method: 'PUT',
                    body: JSON.stringify({topicId}),
                    headers: {
                        'content-type': 'application/json',
                        ...makeAuthHeader(),
                    },
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }

                    return Promise.reject(response.json());
                })
            ).pipe(
                mergeMap(() => concat(
                    of(occupyTopicSuccess({user: current, topicId})),
                    of(updateCurrentUser({topic: topicId}))
                )),
                catchError(errPromise => console.log('err = ', errPromise) || from(errPromise)
                    .pipe(
                        mergeMap(err => {
                            toast.error(err.message);
                            return of(occupyTopicFail(err));
                        })
                    ))
            );
        })
    );

const updateTopicEpic = (action$, state) =>
    action$.pipe(
        ofType(TOPICS_UPDATE),
        mergeMap(({payload}) => from(
            fetch('http://localhost:5000/topics/update', {
                method: 'PUT',
                body: JSON.stringify(payload),
                headers: {
                    'content-type': 'application/json',
                    ...makeAuthHeader(),
                },
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }

                return Promise.reject(response.json());
            })
        ).pipe(
            mergeMap(() =>
                of(updateTopicsSuccess(payload))),
            catchError(errPromise => from(errPromise)
                .pipe(
                    mergeMap(err => {
                        toast.error(err.message);
                        return of(updateTopicsFail(err));
                    })
                ))
        ))
    );

const addTopicEpic = (action$, state) =>
    action$.pipe(
        ofType(TOPICS_ADD),
        mergeMap(({payload}) => from(
            fetch('http://localhost:5000/topics/', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'content-type': 'application/json',
                    ...makeAuthHeader(),
                },
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }

                return Promise.reject(response.json());
            })
        ).pipe(
            mergeMap(response =>
                of(addTopicsSuccess(response))),
            catchError(errPromise => from(errPromise)
                .pipe(
                    mergeMap(err => {
                        toast.error(err.message);
                        return of(addTopicsFail(err));
                    })
                ))
        ))
    );

const deleteTopicEpic = (action$, state) =>
    action$.pipe(
        ofType(TOPICS_DELETE),
        mergeMap(({payload}) => from(
            fetch('http://localhost:5000/topics/', {
                method: 'DELETE',
                body: JSON.stringify(payload),
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
            mergeMap(() =>
                of(deleteTopicsSuccess(payload))),
            catchError(errPromise => from(errPromise)
                .pipe(
                    mergeMap(err => {
                        toast.error(err.message);
                        return of(deleteTopicsFail(err));
                    })
                ))
        ))
    );

const topicEpic = combineEpics(
    occupyTopicEpic,
    updateTopicEpic,
    addTopicEpic,
    deleteTopicEpic
);

export default topicEpic;
