const statuses = {
    UNAUTHORIZED: 401,
    PERMISSION_DENIED: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL: 500,
};

const messages = {
    AUTH_ERROR: 'Неверный логин и/или пароль',
    DUPLICATE_LOGIN: 'Данное имя пользователя уже существует',

    USER_NOT_FOUND: 'Пользователь не найден',

    GROUP_ERROR_TOPIC: 'Топик недоступен для Вашей группы',
    OCCUPIED_TOPIC: 'Топик уже был занят',
    EMPTY_TOPIC: 'Топик не может быть пустым',
    INCORRECT_TOPIC_DATA: 'Ожидался список топиков',
    INCORRECT_TOPIC_IDS_DATA: 'Ожидался список ID топиков',
    TOPIC_TITLE_REQUIRED: 'Заголовок топика не может быть пустым',
    TOPIC_ID_CANNOT_BE_NUMBER: 'ID топика не может быть числом',

    SHOULD_BE_ADMIN: 'Только администратор может осуществлять данную операцию',

    NO_UPDATE_FIELDS_PASSED: 'Отсутствуют данные для обновления',

    DATABASE_ERROR: 'Произошла ошибка при работе с базой данных',
};


module.exports = {
    ...statuses,
    ...messages,
};
