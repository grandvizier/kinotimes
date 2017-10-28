var logger = new (require('../utils/logger.js'));
var db = new (require('../core/Database.js'));
var router = require("express").Router();
var apicache = require("apicache");
var moment = require('moment');

apicache.options({ debug: true });
let cache = apicache.middleware;

// routes served at /api/...
router.route("/getAll").get(getAllFilms);
router.route("/byTitle").get(cache('1 minute'), getFilmsWithTimes);
router.route("/byTheater").get(cache('1 minute'), getTheatersWithTimes);

router.route("/cache/clear").get((req, res) => {
    logger.info('clearing cache', apicache.getIndex());
    res.json(apicache.clear())
});

function getAllFilms(req, res) {
    logger.info('get all films');
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