var logger = (require('../utils/logger.js'))(module.id);
var dayjs = require('dayjs'),
async = require('async');

var argv = require('yargs')
	.usage('Usage: $0 -d [num] [--imdb | --genUpdate | --images | --theaters]')
	.alias('d', 'days')
	.coerce('d', function (arg) {
		if (arg > 0 && arg < 14 && typeof arg != 'boolean'){
			return arg;
		} else { throw "Invalid day range"; }
	})
	.help('h')
	.alias('h', 'help')
	.argv;

logger.debug("args parsed (days, imdb, genUpdate, images, theaters):",
	argv.d, argv.imdb, argv.genUpdate, argv.images, argv.theaters);
logger.verbose("Days to search ahead (including today):", argv.days);


var BerlinDeFilms = require('./BerlinDeFilms.js');
var parser = new BerlinDeFilms();
var db = new (require('./Database.js'));
db.connect();
var SaveFilms = require('./SaveFilms.js');
var saver = new SaveFilms(db);
var UpdateFilmInfo = require('./UpdateFilmInfo.js');
var updater = new UpdateFilmInfo();
var ImageStoring = require('./ImageStoring.js');
var imager = new ImageStoring();
var BerlinDeTheaters = require('./BerlinDeTheaters.js');
var theaterParser = new BerlinDeTheaters(db);


if (argv.days){
	var daysToCheck = [];
	for (i = 0; i < argv.days; i++) {
		daysToCheck.push(dayjs().add(i, 'days').format('YYYY-MM-DD'));
	}
	filmsToScrapeMore = {};
	// first remove all the showtimes
	updater.removeShowtimes(function(err){
		logger.info('done removing old showtimes', err);
		async.each(daysToCheck, function(day, cb){
			parser.getFilms(day, function(err, films){
				if(err){
					return cb(err);
				} else if (!films || films.length == 0) {
					logger.warn('No films found for ', day);
					cb();
				} else {
					saver.save(films, day, function(err, nonReviewedFilms){
						if(err) {
							cb(err);
						} else {
							for (var id in nonReviewedFilms) {
								if(!filmsToScrapeMore[id]) {
									filmsToScrapeMore[id] = nonReviewedFilms[id]
								}
							}
							cb(null)
						}
					});
				}
			});

		}, function(err) {
			(err) ? logger.error(err) : logger.info('done collecting info');
			async.each(filmsToScrapeMore, function(filmInfo, cb2){
				parser.parseFilmData(filmInfo.originalID, function(err, data){
					if(err) {
						logger.warn("Failed to get more data for", filmInfo, err);
						cb2(err);
					} else {
						updater.originalDataUpdate(filmInfo._id, data, function(err, success){
							if(err) {
								logger.warn("Failed to save additional data for", filmInfo, err);
							}
							else {
								logger.debug("Updated additional data for", filmInfo.title);
							}
							cb2(err);
						})
					}
				})
			}, function(err) {
				(err) ? logger.error(err) : logger.info('done.');
				db.disconnect();
			});
		});
	});

}

if (argv.genUpdate){
	updater.omdbUpdate(function(err){
		logger.info('done omdb updating');
		db.disconnect();
	});
} else if (argv.imdb){
	updater.imdbUpdateById(function(err){
		logger.info('done imdb updating');
		db.disconnect();
	});
} else if (argv.images){
	imager.getImages([], function(err){
		logger.info('done imdb updating');
		db.disconnect();
	});
} else if (argv.theaters){
	theaterParser.getTheaters(function(err, theaterList){
		if(err){
			logger.error(err);
			db.disconnect();
		} else if (!theaterList || theaterList.length == 0) {
			logger.warn('No theaters found');
			db.disconnect();
		} else {
			async.each(theaterList, function(theater, cb){
				if(!theater.originalID || theater.originalID == "") {
					logger.debug("no id to check theater:", theater.name)
					cb(null)
				}
				theaterParser.saveNewTheater(theater, function(err, result){
					(err) ? cb(err) : cb(null);
				});
			}, function(err) {
				(err) ? logger.error(err) : logger.info('done.');
				db.disconnect();
			});
		}
	});
}
