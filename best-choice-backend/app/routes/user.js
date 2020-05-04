const express = require('express');

const {auth, register, getAll, getByLogin, getCurrent, update, deleteByLogin} = require('../controllers/user');


// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/auth', auth);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:login', getByLogin);
router.put('/:login', update);
router.delete('/:login', deleteByLogin);

module.exports = router;
