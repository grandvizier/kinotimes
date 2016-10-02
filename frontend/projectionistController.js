var logger = new (require('../utils/logger.js'));
var db = new (require('../utils/Database.js'));
var _ = require('lodash');

var router = require("express").Router();
router.route("/projectionist/admin/:id?").get(getFilms).post(addImdbId);

function getFilms(req, res) {
    logger.info('projectionist getting....');
    db.getAllFilms(function (err, films) {
        if (err){
            res.send(err);
        } else {
            res.json(films);
        }
    });
}

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