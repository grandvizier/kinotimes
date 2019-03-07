var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showtimeSchema = new Schema({
	_film: { type: Schema.Types.ObjectId, ref: 'Film' },
	_theater: { type: Schema.Types.ObjectId, ref: 'Theater' },
	timestamp: Date
});

var Showtime = mongoose.model('Showtime', showtimeSchema);

module.exports = Showtime;
