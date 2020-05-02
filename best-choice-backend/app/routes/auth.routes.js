const authController = require('../controllers/auth');

module.exports = app => {
    app.post('/auth', authController.makeAuth);
};
