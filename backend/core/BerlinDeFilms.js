var jsdom = require('jsdom'),
request = require('request'),
dayjs = require('dayjs');
const { JSDOM } = jsdom;
var logger = (require('../utils/logger.js'))(module.id);

const DIRECTOR = "Regie:"
const COUNTRY  = "Land:"
const YEAR     = "Jahr:"
const _BASE_URL   = 'https://www.berlin.de';
const _SEARCHPATH = '/kino/_bin/trefferliste.php?kino=';
const _URL_PARAMS = '&genre=&stadtteil=&freitext=&ovomu=check&suche=1';

function BerlinDeFilms() {
	this.web_url = function(dateString) {
		var d = (dateString) ? dayjs(dateString).format('DD.MM.YYYY') : dayjs().format('DD.MM.YYYY');
		return _BASE_URL + _SEARCHPATH + '&datum=' + d + _URL_PARAMS
	};
}

/*
 * @param {String} startDate valid startDate is ISO string: 'YYYY-MM-DD'
 * @param {Function} callback function(err, result)
 * @return {Array} the list of films as an array of json objects
*/
BerlinDeFilms.prototype.getFilms = function(startDate, callback) {
	var getUrl = this.web_url(startDate);
	logger.info('checking films at:', getUrl);
	request({uri: getUrl}, function(err, response, body){

		if(err || response.statusCode !== 200){
			(err) ? logger.error(err) : logger.error('Request error.', response);
			callback(err);
		}
		callback(null, parseShowtimes(body, getUrl));
	});
};


function parseShowtimes(body, urlSearched) {
	var items = new Array();
	var theaterName = "";
	var films = [];

	const dom = new JSDOM(body, {
		url: urlSearched,
		contentType: "text/html",
		includeNodeLocations: true,
		storageQuota: 10000000
	}).window.document;

	logger.info('going through the data')

	var resultList = dom.querySelector('.searchresult .trefferliste').children;
	for (let element of resultList) {
		var tag_type = element.tagName;
		var film_info = {'name': '', 'times': []};
		if(tag_type == 'H3') {
			if(theaterName){
				items.push({'name': theaterName, 'films': films});
			}
			theaterName = element.textContent.trim();
			theaterName = theaterName.substring(0, theaterName.indexOf(','));
			// TODO theater neighborhood is second part of theaterName.indexOf(',')
			films = [];
			// logger.debug(theaterName)
		} else if (tag_type == 'DL')  {
			let title = '';
			let times = '';
			for (let subEl of element.children) {
				subTag = subEl.tagName;
				if(subTag == 'DT'){
					title = subEl.getElementsByTagName("button")[0].textContent.trim();
				} else {
					let ts = subEl.getElementsByTagName("td")[1].textContent;
					times = ts.split(",").map(function(s) { return s.trim() });
					var origID = subEl.getElementsByTagName("a")[0].href;
					// logger.info({'title': title, 'times': times, 'origID': origID})
					films.push({'title': title, 'times': times, 'origID': origID});
				}
			}
		}
	}
	if(theaterName){
		items.push({'name': theaterName, 'films': films});
	}
	return items;
}

/*
 * @param {String} idUrl original path to the film data
 * @param {Function} callback function(err, result)
 * @return {Object} data that should be updated in the db (if found)
*/
BerlinDeFilms.prototype.parseFilmData = function(idUrl, callback) {
	let filmInfo = {};
	logger.info(' getting more info about film at:', idUrl);
	request({uri: idUrl}, function(err, response, body){
		if(err || response.statusCode !== 200){
			(err) ? logger.error(err) : logger.error('Request invalid', response);
			callback(err);
		}

		const dom = new JSDOM(body, {
			url: idUrl,
			contentType: "text/html",
			includeNodeLocations: true,
			storageQuota: 10000000
		}).window.document;
		var allTitles = dom.querySelectorAll("div.article-attributes ul .title")
		var allValues = dom.querySelectorAll("div.article-attributes ul .text")
		if(allTitles.length != allValues.length){
			return callback("attribute count doesn't match")
		}

		for (i = 0; i < allTitles.length; i++) {
			switch (allTitles[i].textContent.trim()) {
				case DIRECTOR:
					filmInfo.director = allValues[i].textContent.trim();
					break;
				case COUNTRY:
					filmInfo.country = allValues[i].textContent.trim();
					break;
				case YEAR:
					filmInfo.year = allValues[i].textContent.trim();
					break;
				default:
					// logger.debug("Not using:", allTitles[i].textContent, allValues[i].textContent);
			}
		}
		if(filmInfo == {}){
			logger.verbose("Not enough data about film to update")
			callback(null, null)
		} else {
			callback(null, filmInfo)
		}
	});
};


module.exports = BerlinDeFilms;