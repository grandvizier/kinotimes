var logger = new (require('../utils/logger.js'));
var db = new (require('../core/Database.js'));
var _ = require('lodash');

var router = require("express").Router();
router.route("/films/:id?").get(getFilms);
router.route("/").get(getFilmsWithTimes);

function getFilms(req, res) {
    logger.info('get all the films at the controller');
    db.getAllFilms(function (err, films) {
        if (err){
            res.send(err);
        } else {
            res.json(films);
        }
    });
}

function getFilmsWithTimes(req, res) {
    logger.info('get showtimes at the controller');
    db.getAllFilmsWithTimes(4, function (err, films) {
        if (err){
            res.send(err);
        } else {
            res.json(films);
        }
    });
}

module.exports = router;