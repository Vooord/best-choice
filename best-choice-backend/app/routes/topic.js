const express = require('express');

const {add, occupy, getAll} = require('../controllers/topic');


// eslint-disable-next-line new-cap
const topicRouter = express.Router();

topicRouter.post('/add', add);
topicRouter.post('/occupy', occupy);

topicRouter.get('/', getAll);

module.exports = topicRouter;
