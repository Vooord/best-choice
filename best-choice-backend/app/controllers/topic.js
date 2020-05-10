const Topic = require('../models/topic');
const User = require('../models/user');
const Adviser = require('../models/adviser');

const {
    DUPLICATE_ENTITY_STATUS, PERMISSION_DENIED_STATUS,
    DUPLICATE_TOPIC_MESSAGE, OCCUPIED_TOPIC_MESSAGE, GROUP_ERROR_TOPIC_MESSAGE,
} = require('../constants/http');


class TopicController {
    // ready
    static async add (req, res) {
        const { title } = req.body;

        if (await Topic.exists(title)) {
            return res.status(DUPLICATE_ENTITY_STATUS).json({ message: DUPLICATE_TOPIC_MESSAGE });
        }

        const {adviser, owner} = req.body;

        let adviserId = null;
        if (adviser) {
            adviserId = (await Adviser.getByUid(adviser))._id;
        }

        let ownerId = null;
        if (owner) {
            ownerId = (await User.getByLogin(owner))._id;
        }

        await new Topic({
            ...req.body,
            adviser: adviserId,
            owner: ownerId,
        });

        return res.json({});
    };

    // ready
    static async occupy (req, res) {
        const {title} = req.body;

        const user = await User.getById(req.user.sub);
        const currentTopic = await Topic.getByOwner(user._id);
        const updatedTopic = await Topic.getByTitle(title);

        if (updatedTopic.owner && updatedTopic.owner !== user.login) {
            return res.status(PERMISSION_DENIED_STATUS).json({ message: OCCUPIED_TOPIC_MESSAGE });
        }

        if (user.group !== updatedTopic.group) {
            return res.status(PERMISSION_DENIED_STATUS).json({ message: GROUP_ERROR_TOPIC_MESSAGE });
        }

        await Topic.updateByTitle(title, {owner: user._id});
        if (currentTopic) {
            await Topic.updateByTitle(currentTopic.title, {owner: null});
        }

        return res.json({});
    }

    // пока умеет только по группе
    static async getAll (req, res) {
        const {group} = req.query;

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
