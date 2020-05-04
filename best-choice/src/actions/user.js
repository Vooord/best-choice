import {createAction} from '../helpers/actions';

export const CURRENT_USER_UPDATE = 'user/CURRENT_USER_UPDATE';
export const NEW_USER_UPDATE = 'user/NEW_USER_UPDATE';

export const {
    [CURRENT_USER_UPDATE]: updateCurrentUser,
    [NEW_USER_UPDATE]: updateNewUser,
} = {
    [CURRENT_USER_UPDATE]: payload => createAction(CURRENT_USER_UPDATE, payload),
    [NEW_USER_UPDATE]: payload => createAction(NEW_USER_UPDATE, payload),
};
