var fs = require('fs');
var assert = require('assert');
var sinon = require('sinon');
var chai = require("chai");
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

var successCb = sinon.spy();

var BerlinDeFilms = require('../core/BerlinDeFilms.js');
var berlinDe = new BerlinDeFilms();


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
var searchResults = require('./data/subset.html')
let expectedFilms = [{
	"films": [{
		"origID": "https://www.berlin.de/kino/_bin/filmdetail.php/254366/",
		"times": [
			"20:15"
		],
		"title": "Gegen den Strom  (OmU)"
	}],
	"name": "Acud Kino"
}, {
	"films": [{
		"origID": "https://www.berlin.de/kino/_bin/filmdetail.php/48772/",
		"times": [
			"19:30"
		],
		"title": "Die Ferien des Monsieur Hulot  (OV)"
	}],
	"name": "Arsenal"
}, {
	"films": [{
		"origID": "https://www.berlin.de/kino/_bin/filmdetail.php/255670/",
		"times": [
			"14:40"
		],
		"title": "#Female Pleasure  (OmU)"
	}, {
		"origID": "https://www.berlin.de/kino/_bin/filmdetail.php/257080/",
		"times": [
			"12:20",
			"20:30"
		],
		"title": "Green Book - Eine besondere Freundschaft  (OmU)"
	}, {
		"origID": "https://www.berlin.de/kino/_bin/filmdetail.php/255845/",
		"times": [
			"11:00"
		],
		"title": "Westwood  (OmU)"
	}],
	"name": "B-ware! Ladenkino"
}]


describe('BerlinDeFilms', function() {
	describe('url check', function() {

		it('should generate the proper search url', function() {
			actual = berlinDe.web_url(t.dayString);
			assert.equal(actual, t.expectedUrl, 'url is not what is expected');
		});

		it('should generate proper url with different formatted date', function() {
			actual = berlinDe.web_url(t.dayStringFormat);
			assert.equal(actual, t.expectedUrlFormatted, 'url format may be wrong');
		});

	});

	describe('request', function() {
		it('should generate a request', function() {
			items = berlinDe.parseShowtimes(searchResults, t.expectedUrl);
			assert.deepEqual(items, expectedFilms, 'parsed data not valid');
		});

	});
});
