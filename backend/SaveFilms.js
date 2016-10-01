var moment = require('moment'),
async = require('async'),
mongoose = require('mongoose');
var logger = new (require('../utils/logger.js'));
var db = new (require('../utils/Database.js'));

var stripParenthesis = /\s*\(.*?\)\s*/g;

function SaveFilms() {
	//connect to db
	db.connect();
}

SaveFilms.prototype.closeConnection = function() {
	db.disconnect();
}


/*
 * @param {Array} films the list of films as an array of json objects
 * @param {String} dateUsed 'YYYY-MM-DD'
 * @param {Function} callback function(err, result)
 * @return {Number} sum
*/
SaveFilms.prototype.save = function(films, dateUsed, callback) {
	async.each(films, function(theater, cb) {
		var theaterName = theater.name.replace(stripParenthesis, '');
		// get theater id from DB
		db.getTheater(theaterName, function(err, theaterModel){
			if(err){
				logger.error(typeof err);
				logger.error(err);
				return;
			}
			var theaterId = theaterModel._id;
			logger.verbose('Theater', theaterName, theaterId);

			async.each(theater.films, function(film, cb2){
				// question - get the Omu/.../etc and save that??
				var filmTitle = film.title.replace(stripParenthesis, '');
				//for each film, get film id (or save it)
				db.getFilm(filmTitle, function(err, filmModel){
					if(err){
						logger.error(typeof err);
						logger.error(err);
						return;
					}
					var filmId = filmModel._id;

					// add new showtimes (timestamp, theaterId, filmId)
					async.each(film.times, function(time, cb3){
						var t = moment(dateUsed + ' ' + time, "YYYY-MM-DD HH:mm");
						var toSave = {'theaterId': theaterId, 'filmId': filmId, 'timestamp': t.format('X')};
						db.saveShowtime(toSave, function(err, saved){
							if(err){
								logger.error(typeof err);
								logger.error(err);
								return;
							}
							cb3();
						});
					}, function(err) {cb2(err);});
				});
			}, function(err) {cb(err);});
		});


	}, function(err) {
		// if any of the saves produced an error, err would equal that error
		if( err ) {
			// One of the iterations produced an error.
			// All processing will now stop.
			logger.error('A film failed to save');
			callback(err);
		} else {
			logger.info('All films saved successfully');
			callback(null, {});
		}
	});

};



module.exports = SaveFilms;
