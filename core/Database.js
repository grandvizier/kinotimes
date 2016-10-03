var mongoose = require('mongoose'),
moment = require('moment');
var logger = new (require('../utils/logger.js'));
var Schema = mongoose.Schema;

var showtimeSchema = new Schema({
	_film: { type: Schema.Types.ObjectId, ref: 'Film' },
	_theater: { type: Schema.Types.ObjectId, ref: 'Theater' },
	timestamp: Date
});

var theaterSchema = new Schema({
	name: String,
	street: String,
	kietz: String,
	website: String,
	showtimes: [{ type: Schema.Types.ObjectId, ref: 'Showtime' }]
});

var filmSchema = new Schema({
	title: String,
	img: String,
	imdbID: String,
	details: {
		director: String,
		actors: String,
		description: String,
		rating: Number,
		year: String,
		genre: String,
		language: String,
		country: String
	},
	showtimes: [{ type: Schema.Types.ObjectId, ref: 'Showtime' }]
});

var FilmModel = mongoose.model('Film', filmSchema);
var TheaterModel = mongoose.model('Theater', theaterSchema);
var ShowtimeModel = mongoose.model('Showtime', showtimeSchema);


function Database() {
	//this.db = 'mongodb://mongo:27017/films';
	this.db = 'mongodb://localhost/films';
}

Database.prototype.connect = function() {
	logger.verbose('connecting');
	mongoose.connect(this.db);
}
Database.prototype.disconnect = function() {
	logger.verbose('closing connection');
	mongoose.disconnect();
}
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
	logger.debug('Mongoose default connection open to ' + this.db);
});
// If the connection throws an error
mongoose.connection.on('error',function (err) {
	logger.warn('Mongoose default connection error: ' + err);
});
// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
	logger.debug('Mongoose default connection disconnected');
});

Database.prototype.getTheater = function(theaterName, cb) {
	logger.debug('looking for theater', theaterName);
	// todo try using FindOne()
	TheaterModel.find({name : theaterName}, function (err, theaters) {
		if (theaters.length){
			logger.verbose('theater exists already. found: ', theaters.length);
			cb(null, theaters[0]);
		}else{
			logger.warn('New theater is added: ', theaterName);
			var t = new TheaterModel({ name: theaterName });
			t.save(function(err, t){
				cb(err,t);
			});
		}
	});
}

Database.prototype.getFilm = function(filmName, cb) {
	logger.debug('looking for film:', filmName);
	var query = {title : filmName};
	FilmModel.findOneAndUpdate(query, query, {new: true, upsert: true}, cb);
}

Database.prototype.saveShowtime = function(toSave, cb) {
	logger.debug('looking for showtime', toSave);
	ShowtimeModel.findOneAndUpdate(toSave, toSave, {new: true, upsert: true}, function (err, showtime) {
		if (err){
			logger.verbose('showtime saving failed.', toSave);
			cb(err);
		}else{
			var conditions = {_id : toSave._film, 'showtimes': { "$nin": [showtime] } };
			var update = {$addToSet: { showtimes: showtime } };
			FilmModel.update(conditions, update, cb);
		}
	});
}

Database.prototype.saveFilmInfo = function(toSave, cb) {
	logger.debug('saving details of film', toSave);
	FilmModel.update({title : toSave.title}, { $set: toSave}, cb);
}

Database.prototype.getAllFilms = function(cb) {
	logger.debug('get all the films');
	FilmModel.find(function (err, films) {
		if (!films.length){
			logger.warn('no films found');
			cb('Error: no films found', null);
		}else{
			cb(err, films);
		}
	});
}

Database.prototype.getAllFilmsWithTimes = function(days, cb) {
	logger.debug('get all the films and their showtimes (for the next ${days} days)');
	var cutoff = moment().add(days, 'days')
	FilmModel.find().populate({
		path: 'showtimes',
		match: { timestamp: {$lt: cutoff.toDate()}},
		populate: { path: '_theater' }
	}).exec(function (err, showtimes) {
		if (!showtimes.length){
			logger.warn('no showtimes found');
			cb('Error: no showtimes found', null);
		}else{
			cb(err, showtimes);
		}
	});
}

Database.prototype.getImdbFilmsOnly = function(cb) {
	logger.debug('get all the films that have IMDB id, but no details');
	FilmModel.find({imdbID: {$exists: true}, 'details.director': null},
	function (err, films) {
		if (!films.length){
			logger.info('no films found needing update');
			cb(null, null);
		}else{
			cb(err, films);
		}
	});
}

Database.prototype.updateImdbID = function(toSave, cb) {
	logger.debug('update the IMDB id for film', toSave);
	// wipe out all the film details, so the next update uses the correct info
	toSave.details = null;
	FilmModel.update({title : toSave.title}, { $set: toSave}, cb);
}


module.exports = Database;
