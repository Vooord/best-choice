export const createAction = (type, payload, meta) => {
    if (!type) {
        throw new TypeError('"createAction" ERROR: "type" argument is required');
    }
    if (typeof type !== 'string') {
        throw new TypeError('"createAction" ERROR: "type" argument should be a string');
    }

    const action = {
        type,
    };

    if (payload) {
        action.payload = payload;
    }
    if (meta) {
        action.meta = meta;
    }

    return action;
};
