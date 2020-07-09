var logger = (require('../utils/logger.js'))(module.id);
var db = new (require('../core/Database.js'));
var router = require("express").Router();
var apicache = require("apicache");
var moment = require('moment');

apicache.options({ debug: true });
let cache = apicache.middleware;

// routes served at /api/...
router.route("/getAll").get(getAllFilms);
router.route("/getDuplicates").get(cache('1 hour'), getDuplicateFilmTitles);
router.route("/byTitle").get(cache('1 hour'), getFilmsWithTimes);
router.route("/byTheater").get(cache('1 hour'), getTheatersWithTimes);

router.route("/updateImdb").get(updateFilms);
router.route("/clearOldFilms").get(clearOldFilms);

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
function getDuplicateFilmTitles(req, res) {
    logger.info('get films that are saved with different original ids, but same title');
    req.apicacheGroup = "getDuplicates"
    db.duplicateFilmNames(function (err, films) {
        if (err){
            res.send(err);
        } else {
            res.json(films);
        }
    });
}
function getFilmsWithTimes(req, res) {
    logger.info('get showtimes at the controller');
    req.apicacheGroup = "byTitle"
    var startPoint = moment().toDate();
    var cutoff = moment().add(4, 'days').toDate();
    db.getFilmsbyShowtimesWithTimeFilter(startPoint, cutoff, function (err, films) {
        if (err){
            res.send(err);
        } else {
            res.json(films);
        }
    });
}

function getTheatersWithTimes(req, res) {
    logger.info('get showtimes based on theater');
    req.apicacheGroup = "byTheater"
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

function updateFilms(req, res) {
    var UpdateFilmInfo = require('../core/UpdateFilmInfo.js');
    var ImageStoring = require('../core/ImageStoring.js');
    var updater = new UpdateFilmInfo();
    var imager = new ImageStoring();

    logger.info('updating imdb...');
    updater.imdbUpdateById(function(err){
        logger.info('done imdb updating', err);
        imager.getImages([], function(err){
            logger.info('done image updating', err);
            res.send('done updating');
        })
    });
}

function clearOldFilms(req, res) {
    var UpdateFilmInfo = require('../core/UpdateFilmInfo.js');
    var updater = new UpdateFilmInfo();
    logger.info('cleaning out old films...');
    updater.removeFilmsWithoutShowtimes(function(err){
        logger.info('done cleaning out old films');
        res.send('done updating');
    });
}

module.exports = router;