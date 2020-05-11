const statuses = {
    UNAUTHORIZED: 401,
    PERMISSION_DENIED: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
};

const messages = {
    AUTH_ERROR: 'Login or password is incorrect',
    DUPLICATE_LOGIN: 'Login is already taken',

    USER_NOT_FOUND: 'User not not found',

    GROUP_ERROR_TOPIC: 'Topic is not available for your group',
    OCCUPIED_TOPIC: 'Topic is already occupied',
    EMPTY_TOPIC: 'Topic can not be empty',
    INCORRECT_TOPIC_DATA: 'A list of topics expected',
    INCORRECT_TOPIC_IDS_DATA: 'A list of topic ids expected',
    TOPIC_TITLE_REQUIRED: 'Topic title is required field',

    SHOULD_BE_ADMIN: 'You should be admin to perform this operation',
};



module.exports = {
    ...statuses,
    ...messages,
};
