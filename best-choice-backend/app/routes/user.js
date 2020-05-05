const express = require('express');

const {auth, register, getAll, getByLogin, getCurrent, update, deleteByLogin} = require('../controllers/user');

// eslint-disable-next-line new-cap
const userRouter = express.Router();

userRouter.post('/auth', auth);
userRouter.post('/register', register);
userRouter.get('/', getAll);
userRouter.get('/current', getCurrent);
userRouter.get('/:login', getByLogin);
userRouter.put('/:login', update);
userRouter.delete('/:login', deleteByLogin);

module.exports = userRouter;
