var assert = require('assert');
var sinon = require('sinon');
var chai = require("chai");
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

var Database = require('../core/Database.js');
var db = sinon.createStubInstance(Database);

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
	nextDayFilmData: {
		name: 'Diff Theater',
		films: [{
			title: 'Tomorrow',
			times: ['12:45', '18:00'],
			origID: '/kino/_bin/filmdetail.php/12345/'
		}]
	},
	date1: "2019-11-01",
	date2: "2019-01-24",
	showtime1: { _theater: '123', _film: '456', timestamp: '2019-11-01T19:45:00.000+01:00' },
	showtime2: { _theater: '123', _film: '456', timestamp: '2019-11-01T21:30:00.000+01:00' },
	nextDay1: { _theater: '321', _film: '654', timestamp: '2019-01-24T12:45:00.000+01:00' },
	nextDay2: { _theater: '321', _film: '654', timestamp: '2019-01-24T18:00:00.000+01:00' },
	theaterModel: {
		name: 'Theater Name',
		_id: '123',
		showtimes: []
	},
	theaterModel2: {
		name: 'Diff Theater',
		_id: '321',
		showtimes: []
	},
	filmModel: {
		_id: '456',
		title: 'Film Title  (OmU)',
		originalID: '12345',
		reviewed: true,
		details: {}
	},
	filmModel2: {
		_id: '654',
		title: 'Tomorrow',
		originalID: '54321',
		reviewed: false,
		details: {}
	},
	errorStr: "some error"
}


describe('SaveFilms', function() {
	describe('save', function() {
		beforeEach(function() {
			successCb.resetHistory();
			db.getTheater.reset();
			db.getFilm.reset();
			db.saveShowtime.reset();
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

			saver.save([t.singleFilmData], t.date1, successCb);

			assert(successCb.calledOnce);
			db.saveShowtime.should.have.been.calledWith(t.showtime1);
			db.saveShowtime.should.have.been.calledWith(t.showtime2);
		});

		it('should catch db film errors', function() {
			db.getTheater.yields(null, t.theaterModel);
			db.getFilm.yields(t.errorStr, t.filmModel);

			saver.save([t.singleFilmData], t.date1, successCb);

			assert(successCb.calledOnce);
			assert(successCb.calledWith(t.errorStr));
			assert(db.saveShowtime.notCalled);
		});

		it('should catch db save errors', function() {
			db.getTheater.yields(null, t.theaterModel);
			db.getFilm.yields(null, t.filmModel);
			db.saveShowtime.withArgs(t.showtime1).yields(null, true);
			db.saveShowtime.withArgs(t.showtime2).yields(t.errorStr);

			saver.save([t.singleFilmData], t.date1, successCb);

			assert(successCb.calledOnce);
			assert(successCb.calledWith(t.errorStr));
		});

		it('should save multiple days', function() {
			db.getTheater.withArgs(t.theaterModel.name).yields(null, t.theaterModel);
			db.getTheater.withArgs(t.theaterModel2.name).yields(null, t.theaterModel2);
			db.getFilm.onFirstCall().yields(null, t.filmModel);
			db.getFilm.onSecondCall().yields(null, t.filmModel2);
			db.saveShowtime.yields(null, true);

			saver.save([t.singleFilmData], t.date1, successCb);
			saver.save([t.nextDayFilmData], t.date2, successCb);

			successCb.should.have.been.calledTwice;
			db.saveShowtime.should.have.been.calledWith(t.showtime1);
			db.saveShowtime.should.have.been.calledWith(t.showtime2);
			db.saveShowtime.should.have.been.calledWith(t.nextDay1);
			db.saveShowtime.should.have.been.calledWith(t.nextDay2);
		});
	});

	describe('return', function() {
		beforeEach(function() {
			successCb.resetHistory();
			db.getFilm.reset();
			db.saveShowtime.reset();

		});

		it('should return only non reviewed films', function() {
			db.getTheater.withArgs(t.theaterModel.name).yields(null, t.theaterModel);
			db.getTheater.withArgs(t.theaterModel2.name).yields(null, t.theaterModel2);
			db.getFilm.onFirstCall().yields(null, t.filmModel);
			db.getFilm.onSecondCall().yields(null, t.filmModel2);
			db.saveShowtime.yields(null, true);
			response = {}
			response[t.filmModel2._id] = t.filmModel2

			saver.save([t.singleFilmData, t.nextDayFilmData], t.date1, successCb);

			successCb.should.have.been.calledOnce;
			successCb.should.have.been.calledWith(null, response);
		});

		it('should not return anything if all films are reviewed', function() {
			db.getTheater.yields(null, t.theaterModel);
			db.getFilm.yields(null, t.filmModel);
			db.saveShowtime.yields(null, true);
			response = {}

			saver.save([t.singleFilmData], t.date1, successCb);

			successCb.should.have.been.calledOnce;
			successCb.should.have.been.calledWith(null, response);
		});

		it('should not return films when there is an error', function() {
			db.getTheater.withArgs(t.theaterModel.name).yields(null, t.theaterModel);
			db.getTheater.withArgs(t.theaterModel2.name).yields(null, t.theaterModel2);
			db.getFilm.onFirstCall().yields(null, t.filmModel);
			db.getFilm.onSecondCall().yields(null, t.filmModel2);
			db.saveShowtime.withArgs(t.showtime1).yields(t.errorStr);
			db.saveShowtime.withArgs(t.showtime2).yields(null, true);

			saver.save([t.singleFilmData, t.nextDayFilmData], t.date1, successCb);

			successCb.should.have.been.calledOnce;
			successCb.should.have.been.calledWith(t.errorStr);
		});

	});
});
