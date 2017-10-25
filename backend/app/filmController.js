var logger = new (require('../utils/logger.js'));
var db = new (require('../core/Database.js'));
var router = require("express").Router();
var moment = require('moment');

// routes served at /api/...
router.route("/getAll").get(getAllFilmsWithTimes);
router.route("/byTitle").get(getFilmsWithTimes);
router.route("/byTheater").get(getTheatersWithTimes);

function getAllFilmsWithTimes(req, res) {
    logger.info('get all films with all times from 5 days ago, to 6 days ahead');
    var startPoint = moment().subtract(5, 'days').toDate();
    var cutoff = moment().add(6, 'days').toDate();
    db.getFilmsWithTimeFilter(startPoint, cutoff, function (err, films) {
        if (err){
            res.send(err);
        } else {
            res.json(films);
        }
    });
}
function getFilmsWithTimes(req, res) {
    logger.info('get showtimes at the controller');
    var startPoint = moment().toDate();
    var cutoff = moment().add(4, 'days').toDate();
    db.getFilmsWithTimeFilter(startPoint, cutoff, function (err, films) {
        if (err){
            res.send(err);
        } else {
            res.json(films);
        }
    });
}

function getTheatersWithTimes(req, res) {
    logger.info('get showtimes based on theater');
    var startPoint = moment().toDate();
    var cutoff = moment().add(4, 'days').toDate();
    db.getTheatersWithTimes(startPoint, cutoff, function (err, films) {
        if (err){
            res.send(err);
        } else {
            res.json(films);
        }
    });
}

module.exports = router;