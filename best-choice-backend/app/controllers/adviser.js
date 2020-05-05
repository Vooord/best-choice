const Adviser = require('../models/adviser');

const {DUPLICATE_ENTITY_STATUS, DUPLICATE_ADVISER_MESSAGE} = require('../constants/http');


class AdviserController {
    static async add (req, res) {
        const { uid } = req.body;

        if (await Adviser.exists(uid)) {
            return res.status(DUPLICATE_ENTITY_STATUS).json({ message: DUPLICATE_ADVISER_MESSAGE });
        }

        await new Adviser(req.body);
        return res.json({});
    };
}


module.exports = AdviserController;
