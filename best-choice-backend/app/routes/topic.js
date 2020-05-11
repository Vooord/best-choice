const express = require('express');

const {add, occupy, getAll, update, delete: _delete} = require('../controllers/topic');


// eslint-disable-next-line new-cap
const topicRouter = express.Router();

topicRouter.post('/', add);
topicRouter.delete('/', _delete);
topicRouter.put('/occupy', occupy);
topicRouter.put('/update', update);

topicRouter.get('/', getAll);

module.exports = topicRouter;
