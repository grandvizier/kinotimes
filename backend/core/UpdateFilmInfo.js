// ftp://ftp.fu-berlin.de/pub/misc/movies/database/
var async = require('async'),
request = require('request'),
imdb = require('imdb-api');

var logger = new (require('../utils/logger.js'));
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
				    logger.error(err);
				    logger.error('Request error.', response.statusCode);
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
					var toSave = {
						'title': film.title,
						'img': film_details.Poster,
						'imdbID': film_details.imdbID,
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
	db.getImdbFilmsOnly(function(err, films){
		if(err){
			logger.error(err);
			return callback(err);
		}
		async.each(films, function(film, cb){
			logger.verbose('getting details about: `' + film.title + '`. From:', film.imdbID);
			imdb.getReq({ id: film.imdbID, opts: {apiKey: omdbApiKey, timeout: 13000} }, function(err, movie) {
				if(err){
				    logger.error('IMDB error.', film.imdbID, err);
				    return cb();
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
						'aka': (film.title != movie.title) ? movie.title : ""
					}
				};
				db.saveFilmInfo(toSave, function(err, saved){
					if(err) logger.error(err);
					cb();
				});
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
