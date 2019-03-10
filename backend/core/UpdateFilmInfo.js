// ftp://ftp.fu-berlin.de/pub/misc/movies/database/
var async = require('async'),
request = require('request'),
imdb = require('imdb-api');

var logger = (require('../utils/logger.js'))(module.id);
var db = new (require('./Database.js'));

var omdbApiKey = process.env.OMDB_APIKEY

function UpdateFilmInfo() {
	this.omdb_url = "http://www.omdbapi.com/";
}

UpdateFilmInfo.prototype.omdbUpdate = function(callback) {
	self = this;
	db.getAllFilms(function(err, films){
		if(err){
			logger.error(err);
			return callback(err);
		}
		async.each(films, function(film, cb){
			// only check films that don't have details already
			if(film.details.director){
				logger.info(film.title, ' already has details');
				return cb();
			}
			var url = self.omdb_url + '?apikey='+ omdbApiKey + '&t='+ film.title;
			logger.verbose('getting details about: `' + film.title + '`. From url:', url);
			request({uri: url}, function(err, response, body){
				if(err || response.statusCode !== 200){
				    logger.info("error with " + film.title + " response");
				    (err) ? logger.error(err) : logger.error('Request error.', response.statusCode);
				    return cb();
				}
				try{
					film_details = JSON.parse(body);
				} catch(err){
					logger.error(err);
					logger.debug("Problem parsing resonse from " + film.title + ": " + body);
					return cb();
				}
				if(film_details.Response == "True"){
					// check if the details match what was originally scanned
					reviewed = false
					if(film.scannedOriginal) {
						if(film.originalDetails.director && film.originalDetails.director != film_details.Director) {
							logger.warn("Directors don't match: ", film.originalDetails.director, film_details.Director)
						} else if(film.originalDetails.director && film.originalDetails.director == film_details.Director) {
							reviewed = true
						}
						if(film.originalDetails.country && film.originalDetails.country != film_details.Country) {
							logger.warn("Country doesn't match: ", film.originalDetails.country, film_details.Country)
							reviewed = false
						} else if(film.originalDetails.director && film.originalDetails.director == film_details.Director) {
							reviewed = true
						}
						if(film.originalDetails.year && film.originalDetails.year != film_details.Year) {
							logger.warn("Year doesn't match: ", film.originalDetails.year, film_details.Year)
							reviewed = false
						} else if(film.originalDetails.director && film.originalDetails.director == film_details.Director) {
							reviewed = true
						}
					}
					var toSave = {
						'title': film.title,
						'img': film_details.Poster,
						'imdbID': film_details.imdbID,
						'reviewed': reviewed,
						'details': {
							'director': film_details.Director,
							'actors': film_details.Actors,
							'description': film_details.Plot,
							'rating': parseFloat(film_details.imdbRating) ? film_details.imdbRating : null,
							'year': film_details.Year,
							'genre': film_details.Genre,
							'language': film_details.Language,
							'country': film_details.Country,
							'aka': ''
						}
					};
					db.saveFilmInfo(toSave, function(err, saved){
						if(err) logger.error(err);
						cb();
					});
				} else {
					cb();
				}
			});
		}, function(err) {
			if(err) logger.error(err);
			callback();
		});
	});
}


UpdateFilmInfo.prototype.imdbUpdateById = function(callback) {
	const cli = new imdb.Client({apiKey: omdbApiKey, timeout: 13000});
	db.getImdbFilmsOnly(function(err, films){
		if(err){
			logger.error(err);
			return callback(err);
		}
		async.each(films, function(film, cb){
			logger.verbose('getting details about: `' + film.title + '`. From:', film.imdbID);
			cli.get({ id: film.imdbID, short_plot: true}).then(movie => {
				var aka = ""
				var re = /[3d|\.]/gi;;
				let n1 = film.title.toLowerCase().replace(re, '').trim()
				let n2 = movie.title.toLowerCase().replace(re, '').trim()
				if (n1 !== n2) {
					aka = movie.title;
				}
				var toSave = {
					'title': film.title,
					'img': movie.poster,
					'imdbID': movie.imdbid,
					'details': {
						'director': movie.director,
						'actors': movie.actors,
						'description': movie.plot,
						'rating': parseFloat(movie.rating) ? movie.rating : null,
						'year': movie._year_data,
						'genre': movie.genres,
						'language': movie.languages,
						'country': movie.country,
						'aka': aka
					}
				};
				db.saveFilmInfo(toSave, function(err, saved){
					if(err) logger.error(err);
					cb();
				});
			}).catch(err => {
				logger.error('IMDB error.', film.imdbID, err);
				return cb();
			});
		}, function(err) {
			if(err) logger.error(err);
			callback();
		});
	});
}

UpdateFilmInfo.prototype.removeShowtimes = function(callback) {
	db.removeShowtimesEverywhere(function(err){
		callback(err);
	});
}

UpdateFilmInfo.prototype.removeFilmsWithoutShowtimes = function(callback) {
	db.removeFilmsWithoutShowtimes(function(err){
		callback(err);
	});
}

module.exports = UpdateFilmInfo;
