var mongoose = require('mongoose');
var logger = new (require('../utils/logger.js'));
var Schema = mongoose.Schema;

var showtimeSchema = new Schema({
	filmId: Schema.Types.ObjectId,
	theaterId: Schema.Types.ObjectId,
	timestamp: Date
});

var theaterSchema = new Schema({
	id: Schema.Types.ObjectId,
	name: String,
	street: String,
	kietz: String,
	website: String,
});

var filmSchema = new Schema({
	id: Schema.Types.ObjectId,
	title: String,
	img: String,
	details: {
		director: String,
		actors: String,
		description: String,
		rating: Number
	}
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

Database.prototype.getTheater = function(theaterName, cb) {
	logger.debug('looking for theater', theaterName);
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
	FilmModel.find({title : filmName}, function (err, films) {
		if (films.length == 1){
			logger.verbose('film `' + filmName +'` exists already.');
			cb(null, films[0]);
		}else if(films.length){
			logger.warn('found more than 1 film with title `' + filmName +'`, but getting the first', films.length);
			cb(null, films[0]);
		}else{
			var f = new FilmModel({ title: filmName });
			f.save(function(err, f){
				cb(err,f);
			});
		}
	});
}

Database.prototype.saveShowtime = function(toSave, cb) {
	logger.debug('looking for showtime', toSave);
	ShowtimeModel.find(toSave, function (err, showtimes) {
		if (showtimes.length){
			logger.verbose('showtime exists already.', toSave);
			cb(null,false);
		}else{
			var s = new ShowtimeModel(toSave);
			s.save(function(err, s){
				cb(err,s);
			});
		}
	});
}


module.exports = Database;
