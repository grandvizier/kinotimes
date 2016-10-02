var logger = new (require('../utils/logger.js'));
var db = new (require('../utils/Database.js'));
var _ = require('lodash');

var router = require("express").Router();
router.route("/films/:id?").get(getFilms).post(addImdbId);

function getFilms(req, res) {
    logger.info('getting....');
    db.getAllFilms(function (err, films) {
        if (err){
            logger.error('bad');
            res.send(err);
        } else {
            logger.info('good', films.length);
            res.json(films);
        }
    });
}

function addImdbId(req, res) {
    var toSave = _.extend({}, req.body);
    db.updateImdbID(toSave, function (err) {
        if (err)
            res.send(err);
        else
            res.json(toSave);
    });
}

module.exports = router;