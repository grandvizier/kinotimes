var assert = require('assert');
var sinon = require('sinon');

var mockDb = { 
	getTheater: function () {} 
}

var spy = sinon.spy();
var mock = sinon.mock(mockDb);


var SaveFilms = require('../core/SaveFilms.js');
var saver = new SaveFilms(mock);

var filmData = { 
	name: 'Theater Name',
	films: [{
		title: 'Film Title  (OmU)',
		times: ['19:45', '21:30'],
		origID: '/kino/_bin/filmdetail.php/12345/'
	}] 
}


describe('SaveFilms', function() {
	describe('save', function() {
		it('should take in db', function() {
			mock.expects("getTheater").once().throws()
			saver.save([filmData], "2019-01-01", spy);
			mock.verify();
			assert(spy.calledOnce);
		});
	});
});
