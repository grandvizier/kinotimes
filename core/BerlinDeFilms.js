var jsdom = require('jsdom'),
request = require('request'),
moment = require('moment');
var logger = new (require('../utils/logger.js'));

// TODO: create a ParseFilm parent class

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
			var details = $('.searchresult').children();
			details.each(function( index, element ) {
				var tag_type = $(element).get(0).tagName;
				var film_info = {'name': '', 'times': []};
				if(tag_type == 'H2') {
					if(theaterName){
						items.push({'name': theaterName, 'films': films});
					}
					theaterName = $(element).text();
					films = [];

				} else if (tag_type == 'H3') {
					// get times to add to film
					var timeStr = $(element).next().find('td.uhrzeit').text();
					var times = timeStr.split(",").map(function(s) {
						return s.trim();
					});
					films.push({'title': $(element).text(), 'times': times});
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