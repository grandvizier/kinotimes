var assert = require('assert');
var sinon = require('sinon');

var Database = require('../core/Database.js');
var dbStub = sinon.spy(function() {
  return sinon.createStubInstance(Database);
});
var db = new dbStub();

var successCb = sinon.spy();

var SaveFilms = require('../core/SaveFilms.js');
var saver = new SaveFilms(db);

// Test Data
var t = {
	singleFilmData: {
		name: 'Theater Name',
		films: [{
			title: 'Film Title  (OmU)',
			times: ['19:45', '21:30'],
			origID: '/kino/_bin/filmdetail.php/12345/'
		}]
	},
	date: "2019-01-01",
	showtime1: { _theater: '123', _film: '456', timestamp: '2019-01-01T18:45:00.000+00:00' },
	showtime2: { _theater: '123', _film: '456', timestamp: '2019-01-01T20:30:00.000+00:00' },
	theaterModel: {
		name: 'Theater Name',
		_id: '123',
		showtimes: []
	},
	filmModel: {
		_id: '456',
		title: 'Film Title  (OmU)',
		originalID: '12345',
		reviewed: false,
		details: {}
	},
	errorStr: "some error"
}


describe('SaveFilms', function() {
	describe('save', function() {
		beforeEach(function() {
			successCb.resetHistory();
			db.getTheater.resetHistory();
			db.getFilm.resetHistory();
			db.saveShowtime.resetHistory();
		});

		it('should not save empty films', function() {
			saver.save([], "", successCb);
			assert(successCb.calledOnce);
			assert(db.getTheater.notCalled);
			assert(db.saveShowtime.notCalled);
		});

		it('should process a single film', function() {
			db.getTheater.yields(null, t.theaterModel);
			db.getFilm.yields(null, t.filmModel);
			db.saveShowtime.yields(null, true);

			saver.save([t.singleFilmData], t.date, successCb);

			assert(successCb.calledOnce);
			assert(db.saveShowtime.calledWith(t.showtime1));
			assert(db.saveShowtime.calledWith(t.showtime2));
		});

		it('should catch db film errors', function() {
			db.getTheater.yields(null, t.theaterModel);
			db.getFilm.yields(t.errorStr, t.filmModel);

			saver.save([t.singleFilmData], t.date, successCb);

			assert(successCb.calledOnce);
			assert(successCb.calledWith(t.errorStr));
			assert(db.saveShowtime.notCalled);
		});

		it('should catch db save errors', function() {
			db.getTheater.yields(null, t.theaterModel);
			db.getFilm.yields(null, t.filmModel);
			db.saveShowtime.withArgs(t.showtime1).yields(null, true);
			db.saveShowtime.withArgs(t.showtime2).yields(t.errorStr);

			saver.save([t.singleFilmData], t.date, successCb);

			assert(successCb.calledOnce);
			assert(successCb.calledWith(t.errorStr));
		});
	});
});
