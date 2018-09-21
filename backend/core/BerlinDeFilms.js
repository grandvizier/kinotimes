var jsdom = require('jsdom'),
request = require('request'),
moment = require('moment');
var logger = new (require('../utils/logger.js'));

// If this needs any future work, update jsdom to ver 12.0+
//   https://github.com/jsdom/jsdom/blob/master/Changelog.md

function BerlinDeFilms() {
	var _base_url = 'https://www.berlin.de/kino/_bin/trefferliste.php?kino=';
	var _url_params = '&genre=&stadtteil=&freitext=&ovomu=check&suche=1';
	this.web_url = (d) => _base_url + '&datum=' + d + _url_params;
}

/*
 * @param {String} startDate valid startDate is ISO string: 'YYYY-MM-DD'
		see http://momentjs.com/docs/#/parsing/
 * @param {Function} callback function(err, result)
 * @return {Array} the list of films as an array of json objects
*/
BerlinDeFilms.prototype.getFilms = function(startDate, callback) {
	var d = (startDate) ? moment(startDate).format('DD.MM.YYYY') : moment().format('DD.MM.YYYY');
	var url =  this.web_url(d);
	logger.info('checking films at:',url);
	request({uri: url}, function(err, response, body){
		var items = new Array();
		var theaterName = "";
		var films = [];

		if(err && response.statusCode !== 200){
			logger.error('Request error.', response);
			callback(err);;
		}
		//Send the body param as the HTML code we will parse in jsdom
		//also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
		jsdom.env(body, ["http://code.jquery.com/jquery.js"], function (err, window) {
			var $ = window.$;
			var details = $('.searchresult .trefferliste').children();
			details.each(function( index, element ) {
				var tag_type = $(element).get(0).tagName;
				var film_info = {'name': '', 'times': []};
				if(tag_type == 'H3') {
					if(theaterName){
						items.push({'name': theaterName, 'films': films});
					}
					theaterName = $(element).text().trim();
					theaterName = theaterName.substring(0, theaterName.indexOf(','));
					films = [];
					// logger.debug(theaterName)
				} else if (tag_type == 'DL')  {
					let title = '';
					let times = '';
					$(element).children().each(function( i, subEl ) {
						subTag = $(subEl).get(0).tagName;
						if(subTag == 'DT'){
							title = $(subEl).find('button').text().trim();
						} else {
							let dayStr = $(subEl).find('tr').find('td').text();
							times = dayStr.substring(dayStr.indexOf(":") + 1).split(",").map(function(s) {
								return s.trim();
							});
							var origID = $(subEl).find('a:first').attr('href');
							// logger.info({'title': title, 'times': times, 'origID': origID})
							films.push({'title': title, 'times': times, 'origID': origID});
						}
					});
				}
			});
			if(theaterName){
				items.push({'name': theaterName, 'films': films});
			}
			callback(null, items);;
		});
	});

};



module.exports = BerlinDeFilms;