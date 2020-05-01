import { LOGIN_CHANGE, PASSWORD_CHANGE } from '../actions/auth';
import Immutable from 'seamless-immutable';

export const initialState = {
    login: '',
    password: '',
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_CHANGE: {
            return Immutable.set(state, 'login', payload.value);
        }
        case PASSWORD_CHANGE: {
            return Immutable.set(state, 'password', payload.value);
        }
        default: {
            return state;
        }
    }

};
