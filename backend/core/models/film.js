var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
	showtimes: [{ type: Schema.Types.ObjectId, ref: 'Showtime' }]
});

var Film = mongoose.model('Film', filmSchema);

module.exports = Film;
