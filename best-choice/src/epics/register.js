import {REGISTER_START, REGISTER_SUCCESS, registerSuccess, registerFail} from '../actions/register';
import {combineEpics, ofType} from 'redux-observable';
import {mergeMap, catchError} from 'rxjs/operators';
import {EMPTY, from, of} from 'rxjs';

import history from '../routes/history';
import { Flip, toast } from 'react-toastify';


const onRegisterStartEpic = (action$, state) =>
    action$.pipe(
        ofType(REGISTER_START),
        mergeMap(() => {
            const {login, password, firstName, lastName} = state.value.user.new;
            console.log('login, password, firstName, lastName = ', login, password, firstName, lastName);
            return from(
                fetch('http://localhost:5000/users/register', {
                    method: 'POST',
                    body: JSON.stringify({login, password, firstName, lastName}),
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
                mergeMap(() => of(registerSuccess())),
                catchError(errPromise => from(errPromise)
                    .pipe(
                        mergeMap(err => {
                            toast.error(err.message);
                            return of(registerFail(err));
                        })
                    ))
            );
        })
    );

const onRegisterSuccessEpic = action$ =>
    action$.pipe(
        ofType(REGISTER_SUCCESS),
        mergeMap(() => {
            toast.success('Вы успешно зарегистрированы', {transition: Flip, position: 'top-center'});
            history.push('/auth');
            return EMPTY;
        })
    );

const registerEpics = combineEpics(
    onRegisterStartEpic,
    onRegisterSuccessEpic
);

export default registerEpics;
