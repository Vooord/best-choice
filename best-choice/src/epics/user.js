import {combineEpics, ofType} from 'redux-observable';
import {mergeMap, catchError} from 'rxjs/operators';
import {concat, from, of} from 'rxjs';

import {makeAuthHeader} from '../helpers/jwt';

import {
    USER_ACTUALIZE,
    actualizeUserSuccess, actualizeUserFail,
    updateCurrentUser,
} from '../actions/user';


const actualizeUserEpic = (action$, state) =>
    action$.pipe(
        ofType(USER_ACTUALIZE),
        mergeMap(() =>
            from(
                fetch('http://localhost:5000/users/current', {headers: makeAuthHeader()})
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }

                        return Promise.reject(response.json());
                    })
            ).pipe(
                mergeMap(res =>
                    concat(
                        of(updateCurrentUser(res)),
                        of(actualizeUserSuccess())
                    )),
                catchError(errPromise => from(errPromise)
                    .pipe(
                        mergeMap(err => {
                            toast.erroralert(err.message);
                            return of(actualizeUserFail(err));
                        })
                    ))
            ))
    );

const userEpic = combineEpics(
    actualizeUserEpic
);

export default userEpic;
