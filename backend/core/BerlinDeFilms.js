var jsdom = require('jsdom'),
request = require('request'),
moment = require('moment');
const { JSDOM } = jsdom;
var logger = (require('../utils/logger.js'))(module.id);

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



module.exports = BerlinDeFilms;