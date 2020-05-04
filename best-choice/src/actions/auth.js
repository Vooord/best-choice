import {createAction} from '../helpers/actions';

export const AUTH_START = 'auth/AUTH_START';
export const AUTH_SUCCESS = 'auth/AUTH_SUCCESS';
export const AUTH_FAIL = 'auth/AUTH_FAIL';


export const {
    [AUTH_START]: authStart,
    [AUTH_SUCCESS]: authSuccess,
    [AUTH_FAIL]: authFail,
} = {
    [AUTH_START]: () => createAction(AUTH_START),
    [AUTH_SUCCESS]: () => createAction(AUTH_SUCCESS),
    [AUTH_FAIL]: payload => createAction(AUTH_FAIL, payload),
};
