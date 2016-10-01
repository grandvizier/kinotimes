var jsdom = require('jsdom'),
request = require('request');

var base_url = 'https://www.berlin.de/kino/_bin/trefferliste.php?kino=';
var date_subset = '&datum=06.09.2016';
var url_params = '&genre=&stadtteil=&freitext=&ovomu=check&suche=1';
var web_url = base_url + date_subset + url_params;

request({uri: web_url}, function(err, response, body){
	var self = this;
	var items = new Array();
	var theaterName = "";
	var films = [];

	if(err && response.statusCode !== 200){
		console.log('Request error.');
		return;
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


		console.log('---------------');
		console.log(items[0]);
		console.log(items[1]);
		console.log(items[2]);
		console.log(items[3]);

		}
	);
});