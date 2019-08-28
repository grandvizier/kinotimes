var mongoose = require('mongoose'),
	logger = (require('../utils/logger.js'))(module.id);

mongoose.Promise = global.Promise;
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
	originalID: String,
	img: String,
	imdbID: String,
	reviewed: Boolean,
	details: {
		director: String,
		actors: String,
		description: String,
		rating: Number,
		year: String,
		genre: String,
		language: String,
		country: String,
		aka: String,
	},
	showtimes: [{ type: Schema.Types.ObjectId, ref: 'Showtime' }],
	scannedOriginal: Boolean,
	originalDetails: {
		director: String,
		country: String,
		year: String,
	},
});

var FilmModel = mongoose.model('Film', filmSchema);
var TheaterModel = mongoose.model('Theater', theaterSchema);
var ShowtimeModel = mongoose.model('Showtime', showtimeSchema);


function Database() {
	if (!process.env.KT_MONGO_HOST || !process.env.KT_MONGO_DB){
		logger.error("KT_MONGO_HOST or KT_MONGO_DB not set");
		logger.warn("   KT_MONGO_HOST: localhost:27017");
		logger.warn("   KT_MONGO_DB:   films");
	}
	let mongo_path = process.env.KT_MONGO_HOST + "/" + process.env.KT_MONGO_DB
	this.db = "mongodb+srv://" + mongo_path;
}

Database.prototype.connect = function() {
	logger.verbose('connecting', this.db);
	mongoose.connect(this.db, { useNewUrlParser: true });
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
		if (theaters && theaters.length){
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

Database.prototype.getFilm = function(query, cb) {
	logger.debug('looking for film:', query);
	FilmModel.findOneAndUpdate(query, query, {new: true, upsert: true}, cb);
}

Database.prototype.saveShowtime = function(toSave, cb) {
	logger.debug('looking for showtime', toSave);
	ShowtimeModel.findOneAndUpdate(toSave, toSave, {new: true, upsert: true}, function (err, showtime) {
		if (err){
			logger.verbose('showtime saving failed.', toSave);
			cb(err);
		}else{
			// map to film
			var conditions = {_id : toSave._film, 'showtimes': { "$nin": [showtime] } };
			var update = {$addToSet: { showtimes: showtime } };
			FilmModel.updateOne(conditions, update, (function (err, saved) {
				if (err){
					logger.wanr('showtime saving failed.', err);
					return cb(err);
				}
				// map to time to theater
				var conditions = {_id : toSave._theater, 'showtimes': { "$nin": [showtime] } };
				var update = {$addToSet: { showtimes: showtime } };
				TheaterModel.updateOne(conditions, update, cb);
			}));
		}
	});
}

Database.prototype.removeShowtimesEverywhere = function(cb) {
	ShowtimeModel.deleteMany(function(next){
		// pre-hook doesn't work, so calling individually here
		FilmModel.updateMany({}, { $set: { showtimes: [] }}, {multi: true}, cb);
	});
}
Database.prototype.removeFilmsWithoutShowtimes = function(cb) {
	FilmModel.find({ showtimes: []}).deleteMany( cb );
}

Database.prototype.saveFilmInfo = function(toSave, cb) {
	logger.debug('saving details of film', toSave);
	FilmModel.updateOne({title : toSave.title}, { $set: toSave}, cb);
}

Database.prototype.getAllFilms = function(cb) {
	logger.debug('get all the films');
	FilmModel.find().sort({'reviewed': 1, 'title': 1}).exec(function (err, films) {
		if (!films.length){
			logger.warn('no films found');
			cb('Error: no films found', null);
		}else{
			cb(err, films);
		}
	});
}

Database.prototype.duplicateFilmNames = function(cb) {
	logger.debug('find films that are duplicate');
	FilmModel.aggregate().group({
		_id: "$imdbID", films: { $push: {
			title: "$title",
			originalID: "$originalID",
			id: "$_id",
		} }
	}).exec(function (err, films) {
		if (!films || !films.length){
			logger.warn('no films found');
			cb(null, []);
		}else{
			var duplicates = films.filter(films => films._id && films.films.length > 1)
			cb(err, duplicates);
		}
	});
}

Database.prototype.getFilmsWithTimeFilter = function(startPoint, cutoff, cb) {
	logger.debug('get all the films and their showtimes between', startPoint, cutoff);
	FilmModel.find({'showtimes.0': {$exists: true}}).populate({
		path: 'showtimes',
		match: { timestamp: {$gt : startPoint, $lt: cutoff}},
		populate: {
			path: '_theater',
			select: {'_id': 1, 'name': 1}
		}
	}).sort('title').exec(function (err, showtimes) {
		if (!showtimes.length){
			logger.warn('no showtimes found');
			cb('Error: no showtimes found', null);
		}else{
			cb(err, showtimes);
		}
	});
}

Database.prototype.getTheatersWithTimes = function(startPoint, cutoff, cb) {
	logger.debug('get films and showtimes (grouped by Theater) between', startPoint, cutoff);
	TheaterModel.find({'showtimes.0': {$exists: true}}).populate({
		path: 'showtimes',
		match: { timestamp: {$gt : startPoint, $lt: cutoff}},
		populate: {
			path: '_film',
			select: {'showtimes': 0}
		}
	}).sort('name').exec(function (err, showtimes) {
		if (!showtimes.length){
			logger.warn('no showtimes by theater found');
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
	toSave.reviewed = true;
	var query = {title : toSave.title}
	if(toSave.originalID) {
		query.originalID = toSave.originalID;
	}
	FilmModel.updateOne(query, { $set: toSave}, cb);
}


module.exports = Database;
