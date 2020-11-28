import {AUTH_START, AUTH_SUCCESS, authSuccess, authFail} from '../actions/auth';
import {setCurrentUser, setNewUser} from '../actions/user';
import {combineEpics, ofType} from 'redux-observable';
import {mergeMap, catchError} from 'rxjs/operators';
import {concat, from, of} from 'rxjs';

import history from '../routes/history';
import { toast } from 'react-toastify';


const onAuthStartEpic = (action$, state) =>
    action$.pipe(
        ofType(AUTH_START),
        mergeMap(() => {
            const {login, password} = state.value.user.new;

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

                    return Promise.reject(response.json());
                })
            ).pipe(
                mergeMap(res => of(authSuccess(res))),
                catchError(errPromise => from(errPromise)
                    .pipe(
                        mergeMap(err => {
                            toast.error(err.message);
                            return of(authFail(err));
                        })
                    ))
            );
        })
    );

const onAuthSuccessEpic = action$ =>
    action$.pipe(
        ofType(AUTH_SUCCESS),
        mergeMap(({payload: currentUser}) => {
            localStorage.setItem('token', currentUser.token);
            history.push('/');

            return concat(
                of(setCurrentUser(currentUser)),
                of(setNewUser({}))
            );
        })
    );

const authEpics = combineEpics(
    onAuthStartEpic,
    onAuthSuccessEpic
);

export default authEpics;
