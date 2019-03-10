var moment = require('moment'),
async = require('async');
var logger = (require('../utils/logger.js'))(module.id);

var stripParenthesis = /\s*\(.*?\)\s*/g;

function SaveFilms(dbInstance) {
	this.db = dbInstance;
}


/*
 * @param {Array} films the list of films as an array of json objects
 * @param {String} dateUsed 'YYYY-MM-DD'
 * @param {Function} callback function(err, result)
 * @return {Obj} filmsNotReviewed {id: {filmObj}, ...}
*/
SaveFilms.prototype.save = function(films, dateUsed, callback) {
	let db = this.db;
	filmsNotReviewed = {};
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
				db.getFilm(
					{'title': filmTitle, 'originalID': film.origID},
					function(err, filmModel){
					if(err){
						logger.error(typeof err);
						logger.error(err);
						return cb2(err);
					}
					var filmId = filmModel._id;
					// check if a second scan of film data is needed, and add it to a list
					if(!filmModel.reviewed && !filmModel.scannedOriginal && !filmsNotReviewed[filmId]){
						filmsNotReviewed[filmId] = filmModel
					}

					// add new showtimes (timestamp, theaterId, filmId)
					async.each(film.times, function(time, cb3){
						var t = moment(dateUsed + ' ' + time, "YYYY-MM-DD HH:mm");
						var toSave = {
							'_theater': theaterId,
							'_film': filmId,
							'timestamp': t.format('YYYY-MM-DDTHH:mm:ss.SSSZ')
						};
						db.saveShowtime(toSave, function(err, saved){
							if(err){
								logger.error(typeof err);
								logger.error(err);
								return cb3(err);
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
			callback(null, filmsNotReviewed);
		}
	});

};

module.exports = SaveFilms;
