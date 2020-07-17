var rewire = require('rewire');
var fs = require('fs');
var assert = require('assert');
var sinon = require('sinon');
var chai = require("chai");
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

var successCb = sinon.spy();

var Database = require('../core/Database.js');
var db = sinon.createStubInstance(Database);

var BerlinDeTheaters = require('../core/BerlinDeTheaters.js');
var berlinDe = new BerlinDeTheaters(db);
var berlinDeRewired = rewire('../core/BerlinDeTheaters.js');

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

// Test Data
var t = {
	dayString: "2019-05-23",
	dayStringFormat: "Nov 22, 2002",

	expectedUrl: "https://www.berlin.de/kino/_bin/trefferliste.php?kino=&datum=23.05.2019&genre=&stadtteil=&freitext=&ovomu=check&suche=1",
	expectedUrlFormatted: "https://www.berlin.de/kino/_bin/trefferliste.php?kino=&datum=22.11.2002&genre=&stadtteil=&freitext=&ovomu=check&suche=1",
	errorStr: "some error"
}
var theaterData = require('./data/theaterData.html')
let expectedTheaterData = {
	"name": "Acud Kino",
	"kietz": "Mitte",
	"street": "Veteranenstr. 21 10119",
	"telephone": "030/44359498",
	"originalID": "https://www.berlin.de/kino/_bin/kinodetail.php/30151"
}
let expectedNewTheaterList = [{
	"name": "Arsenal",
	"kietz": "Tiergarten",
	"originalID": "https://www.berlin.de/kino/_bin/kinodetail.php/30155"
}, {
	"name": "B-ware! Open Air FMP1",
	"kietz": "Friedrichshain",
	"originalID": "https://www.berlin.de/kino/_bin/kinodetail.php/36491"
}, {
	"name": "Babylon Kreuzberg",
	"kietz": "Kreuzberg",
	"originalID": "https://www.berlin.de/kino/_bin/kinodetail.php/30158"
}]

let newTheaterSave = [{
	"name": "Arsenal",
	"kietz": "Tiergarten",
	"street": "Potsdamer Str. 2"
}, {
	"name": "Acud Kino",
	"kietz": "Mitte",
	"originalID": "https://www.berlin.de/kino/_bin/kinodetail.php/30151",
}]


describe('BerlinDeTheaters', function() {

	describe('db', function() {
		beforeEach(function() {
			successCb.resetHistory();
			db.getTheater.reset();
		});

		it.skip('should get new theaters from db', function() {
			db.getTheater.yields(null, expectedNewTheaterList);
			berlinDe.getTheaters(successCb);
			assert(successCb.calledOnce);
			assert(successCb.calledWith(expectedNewTheaterList));
		});
	});

	describe('parseHtml', function() {
		it('should parse html for single theater data', function() {
			var private_parseTheaterData = berlinDeRewired.__get__('parseTheaterData');
			items = private_parseTheaterData(theaterData, newTheaterSave[1]);
			assert.deepEqual(items, expectedTheaterData, 'parsed data not valid');
		});
	});

	describe('saveNew', function() {
		beforeEach(function() {
			successCb.resetHistory();
			db.getTheater.reset();
			db.saveTheater.reset();
		});

		it('should not error with empty url', function() {
			var private_parseTheaterData = berlinDeRewired.__get__('parseTheaterData');
			let t1 = newTheaterSave[0]
			berlinDe.saveNewTheater(t1, successCb);

			assert(successCb.calledOnce);
			assert(successCb.calledWith(null));
		});
	});
});
