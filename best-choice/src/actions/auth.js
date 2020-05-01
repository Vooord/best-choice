export const LOGIN_CHANGE = 'auth/LOGIN_CHANGE';
export const PASSWORD_CHANGE = 'auth/PASSWORD_CHANGE';

export const changeLogin = event => ({
    type: LOGIN_CHANGE,
    payload: { value: event.currentTarget.value },
});

export const changePassword = event => ({
    type: PASSWORD_CHANGE,
    payload: { value: event.currentTarget.value },
});
