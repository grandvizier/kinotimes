var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var theaterSchema = new Schema({
	name: String,
	street: String,
	kietz: String,
	website: String,
	showtimes: [{ type: Schema.Types.ObjectId, ref: 'Showtime' }]
});

var Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;
