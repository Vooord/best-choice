import { createAction } from '../helpers/actions';

export const CURRENT_USER_SET = 'user/CURRENT_USER_SET';
export const CURRENT_USER_UPDATE = 'user/CURRENT_USER_UPDATE';

export const NEW_USER_SET = 'user/NEW_USER_SET';
export const NEW_USER_UPDATE = 'user/NEW_USER_UPDATE';

export const USER_ACTUALIZE = 'user/USER_ACTUALIZE';
export const USER_ACTUALIZE_SUCCESS = 'user/USER_ACTUALIZE_SUCCESS';
export const USER_ACTUALIZE_FAIL = 'user/USER_ACTUALIZE_FAIL';

export const {
    [CURRENT_USER_SET]: setCurrentUser,
    [CURRENT_USER_UPDATE]: updateCurrentUser,

    [NEW_USER_SET]: setNewUser,
    [NEW_USER_UPDATE]: updateNewUser,

    [USER_ACTUALIZE]: actualizeUser,
    [USER_ACTUALIZE_SUCCESS]: actualizeUserSuccess,
    [USER_ACTUALIZE_FAIL]: actualizeUserFail,
} = {
    [CURRENT_USER_SET]: payload => createAction(CURRENT_USER_SET, payload),
    [CURRENT_USER_UPDATE]: payload => createAction(CURRENT_USER_UPDATE, payload),

    [NEW_USER_SET]: payload => createAction(NEW_USER_SET, payload),
    [NEW_USER_UPDATE]: payload => createAction(NEW_USER_UPDATE, payload),

    [USER_ACTUALIZE]: () => createAction(USER_ACTUALIZE),
    [USER_ACTUALIZE_SUCCESS]: () => createAction(USER_ACTUALIZE_SUCCESS),
    [USER_ACTUALIZE_FAIL]: payload => createAction(USER_ACTUALIZE_FAIL, payload),
};
