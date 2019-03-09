var jsdom = require('jsdom'),
request = require('request'),
moment = require('moment');
const { JSDOM } = jsdom;
var logger = (require('../utils/logger.js'))(module.id);

const DIRECTOR = "Regie:"
const COUNTRY  = "Land:"
const YEAR     = "Jahr:"

function BerlinDeFilms() {
	var _base_url = 'https://www.berlin.de';
	var _searchPath = '/kino/_bin/trefferliste.php?kino=';
	var _url_params = '&genre=&stadtteil=&freitext=&ovomu=check&suche=1';
	this.web_url = (d) => _base_url + _searchPath + '&datum=' + d + _url_params;
}

/*
 * @param {String} startDate valid startDate is ISO string: 'YYYY-MM-DD'
		see http://momentjs.com/docs/#/parsing/
 * @param {Function} callback function(err, result)
 * @return {Array} the list of films as an array of json objects
*/
BerlinDeFilms.prototype.getFilms = function(startDate, callback) {
	var d = (startDate) ? moment(startDate).format('DD.MM.YYYY') : moment().format('DD.MM.YYYY');
	var getUrl = this.web_url(d);
	logger.info('checking films at:', getUrl);
	request({uri: getUrl}, function(err, response, body){
		var items = new Array();
		var theaterName = "";
		var films = [];

		if(err && response.statusCode !== 200){
			logger.error('Request error.', response);
			callback(err);;
		}
		const dom = new JSDOM(body, {
			url: getUrl,
			contentType: "text/html",
			includeNodeLocations: true,
			storageQuota: 10000000
		}).window.document;

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
		callback(null, items);;

	});
};


/*
 * @param {String} idPath original path to the film data
 * @param {Function} callback function(err, result)
 * @return {Object} data that should be updated in the db (if found)
*/
BerlinDeFilms.prototype.parsePage = function(idPath, callback) {
	getUrl = _base_url + idPath
	var filmInfo = {};
	request({uri: getUrl}, function(err, response, body){
		if(err && response.statusCode !== 200){
			logger.error('Request error.', response);
			callback(err);
		}

		const dom = new JSDOM(body, {
			url: getUrl,
			contentType: "text/html",
			includeNodeLocations: true,
			storageQuota: 10000000
		}).window.document;
		var allTitles = dom.querySelectorAll("div.article-attributes ul .title")
		var allValues = dom.querySelectorAll("div.article-attributes ul .text")
		if(allTitles.length != allValues.length){
			return callback("count doesnt match")
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