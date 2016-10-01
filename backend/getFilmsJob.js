var logger = new (require('../utils/logger.js'));
var moment = require('moment');

var argv = require('yargs')
	.usage('Usage: $0 -d [num]')
	.demand(['d'])
	.alias('d', 'days')
	.argv;
// TODO validate days to be > 0 and < 14
// TODO add start date of not today
logger.verbose("Days to search ahead (including today):", argv.days);
// TODO: option for only updating films

// TODO: option for picking different film sites to parse
var BerlinDeFilms = require('./BerlinDeFilms.js');
var parser = new BerlinDeFilms();

var SaveFilms = require('./SaveFilms.js');
var saver = new SaveFilms();
var UpdateFilmInfo = require('./UpdateFilmInfo.js');
var updater = new UpdateFilmInfo();


for (i = 0; i < argv.days; i++) {
    var day = moment().add(i, 'days').format('YYYY-MM-DD');
	parser.getFilms(day, function(err, films){
		if(err){
			logger.error(err);
		} else {
			saver.save(films, day, function(err, films){
				if(err){
					logger.error(err);
				} else {
					logger.info('done');
				}
			});
		}
	});
}

updater.ombdUpdate(function(err){
	logger.info('done updating');
});

updater.imbdUpdateById(function(err){
	logger.info('done updating');
});
