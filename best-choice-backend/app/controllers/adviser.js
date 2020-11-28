const Adviser = require('../models/adviser');

const {UNPROCESSABLE_ENTITY} = require('../constants/http');


class AdviserController {
    static async add (req, res) {
        const { uid } = req.body;

        if (await Adviser.exists(uid)) {
            return res.status(UNPROCESSABLE_ENTITY).json({ message: `Научный руководитель "${uid}" уже существует` });
        }

        await new Adviser(req.body);
        return res.json({});
    };
}


module.exports = AdviserController;
