import {AUTH_START, AUTH_SUCCESS, authSuccess, authFail} from '../actions/auth';
import {combineEpics, ofType} from 'redux-observable';
import {mergeMap, catchError, map, tap} from 'rxjs/operators';
import {EMPTY, from, of} from 'rxjs';

import history from '../routes/history';


const onAuthStartEpic = (action$, state) =>
    action$.pipe(
        ofType(AUTH_START),
        tap(() => console.log('onAuthStartEpic map state.value = ', state.value)),
        mergeMap(() => {
            const {login, password} = state.value.auth;

            return from(
                fetch('http://localhost:5000/auth', {
                    method: 'POST',
                    body: JSON.stringify({login, password}),
                    headers: {
                        'content-type': 'application/json',
                    },
                }).then(response => response.json())
            ).pipe(
                map(res => {
                    console.log('onAuthStartEpic map RES = ', res);
                    return authSuccess();
                }),
                catchError(err => {
                    console.log('onAuthStartEpic map ERR = ', err);
                    return of(authFail());
                })
            );
        })
    );

const onAuthSuccessEpic = action$ =>
    action$.pipe(
        ofType(AUTH_SUCCESS),
        mergeMap(() => {
            history.push('/table');
            return EMPTY;
        })
    );

const authEpics = combineEpics(
    onAuthStartEpic,
    onAuthSuccessEpic
);

export default authEpics;
