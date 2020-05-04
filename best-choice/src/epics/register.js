import {REGISTER_START, REGISTER_SUCCESS, registerSuccess, registerFail} from '../actions/register';
import {combineEpics, ofType} from 'redux-observable';
import {mergeMap, catchError, map} from 'rxjs/operators';
import {EMPTY, from, of} from 'rxjs';

import history from '../routes/history';


const onRegisterStartEpic = (action$, state) =>
    action$.pipe(
        ofType(REGISTER_START),
        mergeMap(() => {
            const {login, password, firstName, lastName} = state.value.user.new;
            return from(
                fetch('http://localhost:5000/users/register', {
                    method: 'POST',
                    body: JSON.stringify({login, password, firstName, lastName}),
                    headers: {
                        'content-type': 'application/json',
                    },
                }).then(response => {
                    console.log('response = ', response);
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(response);
                })
            ).pipe(
                map(res => {
                    console.log('onRegisterStartEpic response.json() = ', res);
                    return registerSuccess();
                }),
                catchError(err => {
                    console.log('onRegisterStartEpic ERR = ', err);
                    if (err.status) {

                        return of(registerFail(err.status));
                    }

                    return of(registerFail(err));
                })
            );
        })
    );

const onRegisterSuccessEpic = action$ =>
    action$.pipe(
        ofType(REGISTER_SUCCESS),
        mergeMap(() => {
            history.push('/auth');
            return EMPTY;
        })
    );

const registerEpics = combineEpics(
    onRegisterStartEpic,
    onRegisterSuccessEpic
);

export default registerEpics;
