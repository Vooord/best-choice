const UNAUTHORIZED_STATUS = 401;
const PERMISSION_DENIED_STATUS = 403;
const NOT_FOUND_STATUS = 404;
const DUPLICATE_ENTITY_STATUS = 422;

const AUTH_ERROR_MESSAGE = 'Login or password is incorrect';
const DUPLICATE_LOGIN_MESSAGE = 'Login is already taken';

const DUPLICATE_ADVISER_MESSAGE = 'Adviser already exists';

const USER_NOT_FOUND_MESSAGE = 'User not not found';

const DUPLICATE_TOPIC_MESSAGE = 'Topic already exists';
const GROUP_ERROR_TOPIC_MESSAGE = 'Topic is not available for your group';
const UNAVAILABLE_TOPIC_MESSAGE = 'Trying to occupy unavailable topic';
const OCCUPIED_TOPIC_MESSAGE = 'This topic is already occupied';


module.exports = {
    UNAUTHORIZED_STATUS,
    PERMISSION_DENIED_STATUS,
    NOT_FOUND_STATUS,
    DUPLICATE_ENTITY_STATUS,

    AUTH_ERROR_MESSAGE,
    DUPLICATE_LOGIN_MESSAGE,
    DUPLICATE_ADVISER_MESSAGE,
    USER_NOT_FOUND_MESSAGE,

    DUPLICATE_TOPIC_MESSAGE,
    GROUP_ERROR_TOPIC_MESSAGE,
    UNAVAILABLE_TOPIC_MESSAGE,
    OCCUPIED_TOPIC_MESSAGE,
};
