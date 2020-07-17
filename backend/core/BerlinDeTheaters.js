var jsdom = require('jsdom'),
request = require('request');
const { JSDOM } = jsdom;
var logger = (require('../utils/logger.js'))(module.id);


// name street kietz telephone website originalID
const DIRECTOR = "Regie:"
const COUNTRY  = "Land:"
const YEAR     = "Jahr:"

const _BASE_URL   = 'https://www.berlin.de';
const _SEARCHPATH = '/kino/_bin/trefferliste.php?freitext=';
const _URL_PARAMS = '&kino=&datum=&genre=&stadtteil=&suche=1';
const web_url = _BASE_URL + _SEARCHPATH + _URL_PARAMS

function BerlinDeTheaters(dbInstance) {
	this.db = dbInstance;
}

/*
 * @param {Function} callback function(err, result)
 * @return {Array} the list of theaters as an array of json objects
*/
BerlinDeTheaters.prototype.getTheaters = function(callback) {
	logger.info('checking theaters at:', web_url);
	this.db.getNewTheaters(callback);
};

/*
 * @param {Object}  theater data
 * @param {Function} callback function(err, result)
 * @return {boolean} was the theater saved (if already exists, returns null)
*/
BerlinDeTheaters.prototype.saveNewTheater = function(theater, callback) {
	let db = this.db;
	let idUrl = theater.originalID
	if (!idUrl) {
		logger.warn("unable to search for " + theater.name + "with the info", theater)
		return callback(null)
	}
	requestTheaterData(theater, db, callback)
};


function requestTheaterData(theater, db, callback) {
	logger.verbose('getting more data about theater', theater);
	request({uri: theater.originalID}, function(err, response, body){
		if(err || response.statusCode !== 200){
			(err) ? logger.error(err) : logger.error('Request invalid', response);
			return callback(err);
		}
		th = parseTheaterData(body, theater);
		logger.debug('Theater', th, "being saved");
		db.saveTheater(th, function(err, saved){
			callback(err, saved);
		})
	});
}


function parseTheaterData(body, theater) {
	var data = theater;

	const dom = new JSDOM(body, {
		url: theater.originalID,
		contentType: "text/html",
		includeNodeLocations: true,
		storageQuota: 10000000
	}).window.document;

	logger.verbose('going through theater data')

	data["street"] = _getDomData(dom, '.kinodetail .street-address')
	data["street"] += " " + _getDomData(dom, '.kinodetail .postal-code')
	data["telephone"] = _getDomData(dom, '.kinodetail ul span.span')

	return data;
}

function _getDomData(dom, classpath) {
	let el = dom.querySelector('.grid__item '  + classpath)
	if (!el) {
		logger.warn("no data from", classpath)
		return ""
	}
	return el.textContent.trim()

}

module.exports = BerlinDeTheaters;