import {createAction} from '../helpers/actions';


export const REGISTER_START = 'register/REGISTER_START';
export const REGISTER_SUCCESS = 'register/REGISTER_SUCCESS';
export const REGISTER_FAIL = 'register/REGISTER_FAIL';


export const {
    [REGISTER_START]: registerStart,
    [REGISTER_SUCCESS]: registerSuccess,
    [REGISTER_FAIL]: registerFail,

} = {
    [REGISTER_START]: () => createAction(REGISTER_START),
    [REGISTER_SUCCESS]: () => createAction(REGISTER_SUCCESS),
    [REGISTER_FAIL]: payload => createAction(REGISTER_FAIL, payload),

};
