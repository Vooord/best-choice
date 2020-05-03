import { LOGIN_CHANGE, PASSWORD_CHANGE, AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from '../actions/auth';
import Immutable from 'seamless-immutable';

export default (state = {}, { type, payload }) => {
    switch (type) {
        case LOGIN_CHANGE: {
            return Immutable.set(state, 'login', payload);
        }
        case PASSWORD_CHANGE: {
            return Immutable.set(state, 'password', payload);
        }

        case AUTH_START: {
            return Immutable.set(state, 'pending', true);
        }

        case AUTH_SUCCESS: {
            return Immutable.set(state, 'pending', false);
        }

        case AUTH_FAIL: {
            return Immutable.merge(state, {
                pending: false,
                error: true,
            });
        }

        default: {
            return state;
        }
    }

};
