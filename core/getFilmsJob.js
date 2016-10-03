var logger = new (require('../utils/logger.js'));
var moment = require('moment');

var argv = require('yargs')
	.usage('Usage: $0 -d [num]')
	.demand(['d'])
	.alias('d', 'days')
	.argv;
// TODO validate days to be > 0 and < 14
// TODO add start date of not today
logger.verbose("Days to search ahead (including today):", argv.days);
// TODO: option for only updating films

// TODO: option for picking different film sites to parse
var BerlinDeFilms = require('./BerlinDeFilms.js');
var parser = new BerlinDeFilms();

var SaveFilms = require('./SaveFilms.js');
var saver = new SaveFilms();
var UpdateFilmInfo = require('./UpdateFilmInfo.js');
var updater = new UpdateFilmInfo();


// for (i = 0; i < argv.days; i++) {
//     var day = moment().add(i, 'days').format('YYYY-MM-DD');
// 	parser.getFilms(day, function(err, films){
// 		if(err){
// 			logger.error(err);
// 		} else {
// 			saver.save(films, day, function(err, films){
// 				if(err){
// 					logger.error(err);
// 				} else {
// 					logger.info('done');
// 				}
// 			});
// 		}
// 	});
// }


other_films = [{
'name': 'Acud Kino (Mitte)',
'films': [
{ 'title': '1001 Nacht - Teil 3: Der Entzückte (OmU)', 'times': ["20:00"] },
{ 'title': 'Meine Brüder und Schwestern im Norden (OmU)', 'times': ["18:00"] },
{ 'title': 'Captain Fantastic: Einmal Wildnis und zurück (OmU)', 'times': ["21:08"] },
{ 'title': 'Wiener Dog (OmU)', 'times': ["22:15"] }
]
},{
'name': 'Arsenal (Tiergarten)',
'films': [
{ 'title': 'Les rendez-vous d\' Anna - Annas Begegnungen (OmenglU)', 'times': ["21:07"] }
]
},{
'name': 'B-ware! Ladenkino (Friedrichshain)',
'films': [
{ 'title': 'Belladonna of Sadness (OmU)', 'times': ["21:07"] },
{ 'title': 'Café Belgica (OmU)', 'times': ["21:07"] },
{ 'title': 'Captain Fantastic: Einmal Wildnis und zurück (OmU)', 'times': ["21:07"] },
{ 'title': 'Lowlife Love (OmU)', 'times': ["21:07"] },
{ 'title': 'Seefeuer (OmU)', 'times': ["23:00"] },
{ 'title': 'The Assassin (OmU)', 'times': ["23:00"] },
{ 'title': 'Wiener Dog (OmU)', 'times': ["23:00"] }
]
},{
'name': 'Babylon (Kreuzberg)',
'films': [
{ 'title': 'Mahana - Eine Maori-Saga (OmU)', 'times': ["22:00"] },
{ 'title': 'The Lobster - Eine unkonventionelle Liebesgeschichte (OmU)', 'times': ["17:00", "21:30"] },
{ 'title': 'Wiener Dog (OmU)', 'times': ["18:00"] }
]
}];


// var day = moment().add(0, 'days').format('YYYY-MM-DD');
// saver.save(other_films, day, function(err, films){
// 	if(err){
// 		logger.error(err);
// 	} else {
// 		logger.info('done');
// 	}
// });



// updater.omdbUpdate(function(err){
// 	logger.info('done updating');
// });

updater.imdbUpdateById(function(err){
	logger.info('done updating');
});
