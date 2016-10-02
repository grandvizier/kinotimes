var logger = new (require('../utils/logger.js'));
var db = new (require('../utils/Database.js'));
var _ = require('lodash');

var router = require("express").Router();
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