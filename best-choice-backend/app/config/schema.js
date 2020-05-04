const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    login: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    midName: { type: String, default: '' },
    createdDate: { type: Date, default: Date.now },
    group: { type: String, default: '' },
    isAdmin: { type: Boolean, default: false},
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform (doc, ret) {
        delete ret._id;
        delete ret.id;
        delete ret.hash;
        delete ret.createdDate;
    },
});

const UserCollection = mongoose.model('User', schema);

module.exports = {
    UserCollection,
};
