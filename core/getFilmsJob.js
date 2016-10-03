var logger = new (require('../utils/logger.js'));
var moment = require('moment');

var argv = require('yargs')
	.usage('Usage: $0 -d [num] [--imdb | --genUpdate]')
	.alias('d', 'days')
	.coerce('d', function (arg) {
		if (arg > 0 && arg < 14 && typeof arg != 'boolean'){
			return arg;
		} else { throw "Invalid day range"; }
	})
	.help('h')
	.alias('h', 'help')
	.argv;

// TODO add start date of not today
logger.debug("args parsed (days, imdb, genUpdate):", argv.d, argv.imdb, argv.genUpdate);
logger.verbose("Days to search ahead (including today):", argv.days);


// TODO: option for picking different film sites to parse
var BerlinDeFilms = require('./BerlinDeFilms.js');
var parser = new BerlinDeFilms();

var db = new (require('./Database.js'));
db.connect();
var SaveFilms = require('./SaveFilms.js');
var saver = new SaveFilms();
var UpdateFilmInfo = require('./UpdateFilmInfo.js');
var updater = new UpdateFilmInfo();

if (argv.days){
	// first remove all the showtimes
	updater.removeShowtimes(function(err){
		logger.info('done removing old showtimes', err);
		var tasksToGo = argv.days;
		var onComplete = function() {
			logger.info('done');
			db.disconnect();
		};
		if (tasksToGo === 0) {
			onComplete();
		} else {
			// There is at least one element, so the callback will be called.
			for (i = 0; i < argv.days; i++) {
				var day = moment().add(i, 'days').format('YYYY-MM-DD');
				parser.getFilms(day, function(err, films){
					if(err){
						logger.error(err);
						if (--tasksToGo === 0) {
							// No tasks left, good to go
							onComplete();
						}
					} else if (films.length == 0) {
						logger.warn('No films found for ', day);
						if (--tasksToGo === 0) onComplete();
					} else {
						saver.save(films, day, function(err, films){
							(err) ? logger.error(err) : logger.info('saved');
							if (--tasksToGo === 0) onComplete();
						});
					}
				});
			}
		}
	});
}

if (argv.genUpdate){
	updater.removeFilmsWithoutShowtimes(function(err){
		logger.info('done cleaning out old films');
		updater.omdbUpdate(function(err){
			logger.info('done omdb updating');
			db.disconnect();
		});
	});
} else if (argv.imdb){
	updater.imdbUpdateById(function(err){
		logger.info('done imdb updating');
		db.disconnect();
	});
}
