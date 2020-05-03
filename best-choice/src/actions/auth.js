import {createAction} from '../helpers/actions';


export const LOGIN_CHANGE = 'auth/LOGIN_CHANGE';
export const PASSWORD_CHANGE = 'auth/PASSWORD_CHANGE';

export const AUTH_START = 'auth/AUTH_START';
export const AUTH_SUCCESS = 'auth/AUTH_SUCCESS';
export const AUTH_FAIL = 'auth/AUTH_FAIL';


export const {
    [AUTH_START]: authStart,
    [AUTH_SUCCESS]: authSuccess,
    [AUTH_FAIL]: authFail,

    [LOGIN_CHANGE]: changeLogin,
    [PASSWORD_CHANGE]: changePassword,
} = {
    [AUTH_START]: () => createAction(AUTH_START),
    [AUTH_SUCCESS]: () => createAction(AUTH_SUCCESS),
    [AUTH_FAIL]: () => createAction(AUTH_FAIL),

    [LOGIN_CHANGE]: payload => createAction(LOGIN_CHANGE, payload),
    [PASSWORD_CHANGE]: payload => createAction(PASSWORD_CHANGE, payload),
};
