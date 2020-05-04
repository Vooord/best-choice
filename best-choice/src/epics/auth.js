import {AUTH_START, AUTH_SUCCESS, authSuccess, authFail} from '../actions/auth';
import {updateCurrentUser} from '../actions/user';
import {combineEpics, ofType} from 'redux-observable';
import {mergeMap, catchError} from 'rxjs/operators';
import {concat, EMPTY, from, of} from 'rxjs';

import history from '../routes/history';


const onAuthStartEpic = (action$, state) =>
    action$.pipe(
        ofType(AUTH_START),
        mergeMap(() => {
            const {login, password} = state.value.user.current;

            return from(
                fetch('http://localhost:5000/users/auth', {
                    method: 'POST',
                    body: JSON.stringify({login, password}),
                    headers: {
                        'content-type': 'application/json',
                    },
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }

                    return Promise.reject(response);
                })
            ).pipe(
                mergeMap(res => {
                    console.log('onAuthStartEpic RES = ', res);

                    localStorage.setItem('token', res.token);
                    return concat(
                        of(updateCurrentUser(res)),
                        of(authSuccess())
                    );
                }),
                catchError(err => {
                    console.log('onAuthStartEpic ERR = ', err);
                    if (err.status) {
                        return of(authFail(err.status));
                    }

                    return of(authFail(err));
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
