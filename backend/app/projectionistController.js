var logger = new (require('../utils/logger.js'));
var db = new (require('../core/Database.js'));
var router = require("express").Router();

// routes served at /adminapi/...
router.route("/projectionist/admin/:id?").post(addImdbId);

function addImdbId(req, res) {
    var toSave = _.extend({}, req.body);
    logger.info('saving', toSave);
    db.updateImdbID(toSave, function (err) {
        if (err)
            res.send(err);
        else
            res.json(toSave);
    });
}

module.exports = router;