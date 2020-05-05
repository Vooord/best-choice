const express = require('express');

const {add} = require('../controllers/adviser');


// eslint-disable-next-line new-cap
const adviserRouter = express.Router();

adviserRouter.post('/add', add);

module.exports = adviserRouter;
