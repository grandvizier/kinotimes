var logger = new (require('../utils/logger.js'));
var db = new (require('../core/Database.js'));
var router = require("express").Router();

// routes served at /api/...
router.route("/byTitle").get(getFilmsWithTimes);
router.route("/byTheater").get(getTheatersWithTimes);

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

function getTheatersWithTimes(req, res) {
    logger.info('get showtimes based on theater');
    db.getTheatersWithTimes(4, function (err, films) {
        if (err){
            res.send(err);
        } else {
            res.json(films);
        }
    });
}

module.exports = router;