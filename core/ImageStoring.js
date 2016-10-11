var async = require('async'),
mongoose = require('mongoose');
var logger = new (require('../utils/logger.js'));
var db = new (require('./Database.js'));
var config = require('config').get('App');
var tmdb = require('moviedb')(config.app.tmdb_token);
var tmdb_settings = {
    "images_url": "http://image.tmdb.org/t/p/",
    "image_size": "w92"
};


function ImageStoring() {}


/*
 * @param {Array} films the list of films as an array of json objects
 * @param {Function} callback function(err, result)
 * @return {Number} sum
*/
ImageStoring.prototype.getImages = function(films, callback) {
	db.getAllFilms(function(err, films){
		if(err){
			logger.error(err);
			return callback(err);
		}
		async.each(films, function(film, cb){
			if(!film.imdbID){
				logger.info('`' + film.title + '` doesnt have an imdb id');
				return cb();
			} else if(film.img && film.img.indexOf(tmdb_settings.images_url) > -1) {
				logger.verbose('`' + film.title + '` already has updated image');
				return cb();
			} else {
				logger.verbose('else call to get image info', film.imdbID);
				tmdb.movieImages({id: film.imdbID}, function(err, res) {
					if(err){
					    logger.error(err);
					    return cb(err);
					}
					var pathToUse = '',
					previousVote = -1;
					for(var x in res.posters) {
						if(res.posters[x].iso_639_1 == 'de'){
							logger.debug('picking the german image');
							pathToUse = res.posters[x].file_path;
							break;
						}
						if(res.posters[x].vote_count > previousVote){
							previousVote = res.posters[x].vote_count;
							pathToUse = res.posters[x].file_path;
						}
					}
					newPosterPath = tmdb_settings.images_url + tmdb_settings.image_size + pathToUse;
					logger.info(newPosterPath);
					db.saveFilmInfo({'title': film.title, 'img': newPosterPath}, function(err, saved){
						cb(err);
					});
				});
			}
		}, function(err) {
			callback();
		});
	});
};

module.exports = ImageStoring;
