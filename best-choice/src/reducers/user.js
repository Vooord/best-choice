import {AUTH_FAIL, AUTH_START, AUTH_SUCCESS} from '../actions/auth';
import {REGISTER_START, REGISTER_FAIL, REGISTER_SUCCESS} from '../actions/register';
import {CURRENT_USER_SET, CURRENT_USER_UPDATE, NEW_USER_SET, NEW_USER_UPDATE} from '../actions/user';

import Immutable from 'seamless-immutable';


const initialState = {
    current: {}, // с ним работает auth
    new: {}, // с ним работает register
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CURRENT_USER_SET: {
            return Immutable.set(state, 'current', payload);
        }

        case CURRENT_USER_UPDATE: {
            const newCurrentUserState =  Immutable.merge(state.current, payload);
            return Immutable.set(state, 'current', newCurrentUserState);
        }


        case NEW_USER_SET: {
            return Immutable.set(state, 'new', payload);
        }

        case NEW_USER_UPDATE: {
            // да, название так себе
            const newNewUserState =  Immutable.merge(state.new, payload);
            return Immutable.set(state, 'new', newNewUserState);
        }


        case AUTH_START: {
            return Immutable.setIn(state, ['current', 'pending'], true);
        }

        case AUTH_SUCCESS: {
            return Immutable.setIn(state, ['current', 'pending'], false);
        }

        case AUTH_FAIL: {
            return Immutable.setIn(state, ['current', 'pending'], false);
        }


        case REGISTER_START: {
            return Immutable.setIn(state, ['new', 'pending'], true);
        }

        case REGISTER_FAIL: {
            return Immutable.setIn(state, ['new', 'pending'], false);
        }

        case REGISTER_SUCCESS: {
            return Immutable.setIn(state, ['new', 'pending'], false);
        }


        default: {
            return state;
        }
    }
};

export default userReducer;
