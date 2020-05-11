// Пока что он бесполезен

import { AUTH_FAIL } from '../actions/auth';
import { REGISTER_FAIL } from '../actions/register';

import Immutable from 'seamless-immutable';

const errorReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case AUTH_FAIL: {
            return Immutable.set(state, 'auth', payload);
        }

        case REGISTER_FAIL: {
            return Immutable.set(state, 'register', payload);
        }

        default: {
            return state;
        }
    }
};

export default errorReducer;
