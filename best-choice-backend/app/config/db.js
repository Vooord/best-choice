const mongoHost = 'localhost';
const collectionName = (mongoHost === 'localhost') ? 'best-choice-backend-test' : 'best-choice-backend';

const path = `mongodb://${mongoHost}/${collectionName}`; // connectionString
const secret = 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, IT CAN BE ANY STRING';

module.exports = {
    path,
    secret,
};
