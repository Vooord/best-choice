const Topic = require('../models/topic');
const User = require('../models/user');
const Adviser = require('../models/adviser');

const mongoose = require('mongoose');

const _ = require('lodash');

const {
    UNPROCESSABLE_ENTITY,
    PERMISSION_DENIED,
    OCCUPIED_TOPIC,
    GROUP_ERROR_TOPIC,
    INCORRECT_TOPIC_DATA,
    INCORRECT_TOPIC_IDS_DATA,
    SHOULD_BE_ADMIN,
    TOPIC_ID_CANNOT_BE_NUMBER,
} = require('../constants/http');

const {validateTopics} = require('../helpers/validators');


class TopicController {
    static async add (req, res) {
        const user = await User.getById(req.user.sub);
        if (!user.isAdmin) {
            return res.status(PERMISSION_DENIED).json({ message: SHOULD_BE_ADMIN });
        }

        if (req.body && Array.isArray(req.body)) {
            const topics = req.body;

            const {error} = await validateTopics(topics);
            if (error) {
                return res.status(error.status).json({ message: error.message });
            }

            const topicsResult = {};
            for (const topic of topics) {
                const {adviser: adviserUid, owner: ownerLogin} = topic;

                let adviserId = null;
                if (adviserUid) {
                    const adviser = await Adviser.getByUid(adviserUid);
                    if (!adviser) {
                        return res.status(UNPROCESSABLE_ENTITY).json({ message: `Научный руководитель "${adviserUid}" не существует` });
                    }
                    adviserId = adviser._id;
                }

                let ownerId = null;
                if (ownerLogin) {
                    const owner = await User.getByLogin(ownerLogin);
                    if (!owner) {
                        return res.status(UNPROCESSABLE_ENTITY).json({ message: `Студент "${ownerLogin}" не существует` });
                    }

                    ownerId = owner._id;
                }

                const newTopic = await new Topic({
                    ...topic,
                    adviser: adviserId,
                    owner: ownerId,
                });

                const id = newTopic._id;
                topicsResult[id] = {
                    ..._.omit(newTopic.toObject(), ['__v', '_id']),
                    id,
                    owner: ownerId && ownerLogin,
                    adviser: adviserId && adviserUid,
                };
            }

            return res.json(topicsResult);
        }

        return res.status(UNPROCESSABLE_ENTITY).json({ message: INCORRECT_TOPIC_DATA });
    };


    static async occupy (req, res) {
        const user = await User.getById(req.user.sub);

        const {topicId} = req.body;
        try {
            if (!isNaN(topicId)) {
                throw new Error(TOPIC_ID_CANNOT_BE_NUMBER);
            }
            new mongoose.Types.ObjectId(topicId);
        } catch (e) {
            return res.status(UNPROCESSABLE_ENTITY).json({ message: `"${topicId}" не является верным ID топика` });
        }

        const currentTopic = await Topic.getByOwnerId(user._id);
        const newTopic = await Topic.getById(topicId);

        if (newTopic.owner && newTopic.owner !== user._id) {
            return res.status(PERMISSION_DENIED).json({ message: OCCUPIED_TOPIC });
        }

        if (user.group !== newTopic.group) {
            return res.status(PERMISSION_DENIED).json({ message: GROUP_ERROR_TOPIC });
        }

        if (currentTopic) {
            await Topic.updateById(currentTopic._id, {owner: null});
        }
        await Topic.updateById(topicId, {owner: user._id});

        return res.json({});
    }


    static async update(req, res) {
        const user = await User.getById(req.user.sub);
        if (!user.isAdmin) {
            return res.status(PERMISSION_DENIED).json({ message: SHOULD_BE_ADMIN });
        }

        if (req.body && Array.isArray(req.body)) {
            const {error} = await validateTopics(req.body.map(([id, topic]) => topic), {title: 0});
            if (error) {
                return res.status(error.status).json({ message: error.message });
            }

            for (const [id, fields] of req.body) {
                const {owner, adviser, ...restFields} = fields;

                if (owner) {
                    const newOwner = await User.getByLogin(owner);
                    if (!newOwner) {
                        return res.status(UNPROCESSABLE_ENTITY).json({message: `Студент "${owner}" не существует`});
                    }

                    const topicOfANewOwner = await Topic.getByOwnerId(newOwner._id);
                    if (topicOfANewOwner) {
                        return res.status(UNPROCESSABLE_ENTITY).json({ message: `Топик "${topicOfANewOwner.title}" уже привязан к студенту "${owner}"` });
                    }

                    restFields.owner = newOwner._id;
                } else if (owner === '') {
                    restFields.owner = null;
                }

                if (adviser) {
                    const newAdviser = await Adviser.getByUid(adviser);
                    if (newAdviser) {
                        restFields.adviser = newAdviser._id;
                    } else {
                        return res.status(UNPROCESSABLE_ENTITY).json({ message: `Научный руководитель "${adviser}" не существует` });
                    }
                } else if (adviser === '') {
                    restFields.adviser = null;
                }

                await Topic.updateById(id, restFields);
            }
            return res.json({});
        }

        return res.status(UNPROCESSABLE_ENTITY).json({ message: INCORRECT_TOPIC_DATA });
    }


    static async delete (req, res) {
        const user = await User.getById(req.user.sub);
        if (!user.isAdmin) {
            return res.status(PERMISSION_DENIED).json({ message: SHOULD_BE_ADMIN });
        }

        if (req.body && Array.isArray(req.body)) {
            const topicIds = req.body;
            for (const topicId of topicIds) {
                try {
                    if (!isNaN(topicId)) {
                        throw new Error(TOPIC_ID_CANNOT_BE_NUMBER);
                    }
                    new mongoose.Types.ObjectId(topicId);
                } catch (e) {
                    return res.status(UNPROCESSABLE_ENTITY).json({ message: `"${topicId}" не является верным ID топика` });
                }
                await Topic.deleteById(topicId);
            }

            return res.json(topicIds);
        }

        return res.status(UNPROCESSABLE_ENTITY).json({ message: INCORRECT_TOPIC_IDS_DATA });
    }


    static async getAll (req, res) {
        const currentUser = await User.getById(req.user.sub);

        const {isAdmin, group} = currentUser;

        if (isAdmin) {
            const populatedTopics = await Topic.populate(
                await Topic.getAll(),
                {path: 'owner', select: {'firstName': 1, 'lastName': 1, 'login': 1, '_id': 0}}
            )
                .then(ownerPopulatedTopics => Topic.populate(
                    ownerPopulatedTopics,
                    {path: 'adviser', select: {'firstName': 1, 'lastName': 1, 'midName': 1, 'uid':1, '_id': 0}}
                ));

            return res.json(populatedTopics);
        }

        if (group) {
            const populatedTopics = await Topic.populate(
                await Topic.getByGroup(group),
                {path: 'owner', select: {'firstName': 1, 'lastName': 1, 'login': 1, '_id': 0}}
            )
                .then(ownerPopulatedTopics => Topic.populate(
                    ownerPopulatedTopics,
                    {path: 'adviser', select: {'firstName': 1, 'lastName': 1, 'midName': 1, '_id': 0}}
                ));
            return res.json(populatedTopics);
        }

        return res.status(406);
    };
}


module.exports = TopicController;
