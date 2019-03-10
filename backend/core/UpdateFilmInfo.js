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


UpdateFilmInfo.prototype.originalDataUpdate = function(filmId, filmInfo, callback) {
	db.getFilm({'_id': filmId}, function(err, filmModel){
		if(err){
			logger.error("Can't find film to update", err);
			return callback(err);
		}
		filmToUpdate = {'title': filmModel.title}
		// TODO or if second scan already saved
		if(filmModel.reviewed || filmModel.scannedOriginal) {
			logger.debug(filmModel.title, "has already been reviewed/scanned")
			return callback(null);
		}
		if(filmModel.imdbID){
			// if country & year are set, AND they match what is already provided, mark the film as reviewed
			if(filmInfo.country && filmInfo.year) {
				if(filmModel.details.country && filmModel.details.year) {
					if(filmModel.details.country == filmInfo.country && filmModel.details.year == filmInfo.year) {
						filmToUpdate.reviewed = true
					} else {
						// sometimes the years are off by 1, that usually is close enough
						yearDiff = parseInt(filmModel.details.year) - parseInt(filmInfo.year)
						if (-1 <= yearDiff && yearDiff <= 1) {
							filmToUpdate.reviewed = true
						}
					}
				}
			}
			// if year & director are set, AND they match what is already provided, mark the film as reviewed
			if(filmInfo.director && filmInfo.year) {
				if(filmModel.details.director && filmModel.details.year) {
					if(filmModel.details.director == filmInfo.director && filmModel.details.year == filmInfo.year) {
						filmToUpdate.reviewed = true
					} else if (!filmToUpdate.reviewed) {
						logger.warn("new data doesn't match what is expected for", filmModel.title)
						console.log(filmInfo)
						console.log(filmModel.details.director, filmModel.details.year, filmModel.details.country)
						// if they are set and they DO NOT match what is already provided, remove provided values
						return callback(null);
					}
				}
			}
		}
		// if there is no existing data, just add the info directly
		filmToUpdate.scannedOriginal = true;
		filmToUpdate.originalDetails = {
			'director': filmInfo.director,
			'country': filmInfo.country,
			'year': filmInfo.year,
		};
		db.saveFilmInfo(filmToUpdate, function(err, saved){
			callback(err);
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
