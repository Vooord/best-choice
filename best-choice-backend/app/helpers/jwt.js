const expressJwt = require('express-jwt');
const {secret} = require('../config/db');
const {getById} = require('../controllers/user');


async function isRevoked(req, payload, done) {
    const user = await getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
}

function jwt() {
    return expressJwt({ secret, isRevoked, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/users/auth',
            '/users/register',

            '/topics/add', // TODO удалить потом

            '/advisers/add', // TODO удалить потом
        ],
    });
}

module.exports = jwt;
