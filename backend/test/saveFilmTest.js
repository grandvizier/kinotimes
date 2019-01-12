var assert = require('assert');
var sinon = require('sinon');



var Database = require('../core/Database.js');
var dbStub = sinon.spy(function() {
  return sinon.createStubInstance(Database);
});
var db = new dbStub();


var SaveFilms = require('../core/SaveFilms.js');
var saver = new SaveFilms(db);

var singleFilmData = {
	name: 'Theater Name',
	films: [{
		title: 'Film Title  (OmU)',
		times: ['19:45', '21:30'],
		origID: '/kino/_bin/filmdetail.php/12345/'
	}] 
}
var theaterModel = {
	name: 'Theater Name',
	_id: '123',
	showtimes: []
};
var filmModel = {
	_id: '456',
	title: 'Film Title  (OmU)',
	originalID: '12345',
	reviewed: false,
	details: {}
};

describe('SaveFilms', function() {
	describe('save', function() {

		it('should not save films', function() {
			var spyCb = sinon.spy();
			saver.save([], "", spyCb);
			assert(spyCb.calledOnce);
		});

		it('should process a single film', function() {
			var spyCb = sinon.spy();
			db.getTheater.yields(null, theaterModel);
			db.getFilm.yields(null, filmModel);
			db.saveShowtime.yields(null, true);
			saver.save([singleFilmData], "2019-01-01", spyCb);
			// assert(spyCb.calledOnce);

			let showtime1 = { _theater: '123', _film: '456', timestamp: '2019-01-01T18:45:00.000+00:00' }
			let showtime2 = { _theater: '123', _film: '456', timestamp: '2019-01-01T20:30:00.000+00:00' }
			assert(db.saveShowtime.calledWith(showtime1));
			assert(db.saveShowtime.calledWith(showtime2));
		});
	});
});
