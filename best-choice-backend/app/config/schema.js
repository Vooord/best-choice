const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    login: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    midName: { type: String, default: '' },
    createdDate: { type: Date, default: Date.now },
    group: { type: String, default: '' },
    isAdmin: { type: Boolean, default: false},
});

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform (doc, ret) {
        delete ret.id;
        delete ret.hash;
        delete ret.createdDate;
    },
});

const UserCollection = mongoose.model('User', UserSchema);


const TopicSchema = new Schema({
    title: { type: String, unique: true, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    description: { type: String, default: '' },
    group: { type: String, default: '' },
    adviser: { type: Schema.Types.ObjectId, ref: 'Adviser', default: null },
});

const TopicCollection = mongoose.model('Topic', TopicSchema);


const AdviserSchema = new Schema({
    uid: { type: String, unique: true, required: true }, // почта / логин / что-то уникальное про научрука
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    midName: { type: String, default: '' },
});

const AdviserCollection = mongoose.model('Adviser', AdviserSchema);


module.exports = {
    UserCollection,
    TopicCollection,
    AdviserCollection,
};
