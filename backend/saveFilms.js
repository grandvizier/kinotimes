var dd = require('./data.js');
var moment = require('moment');
//npm install moment --save

var dateUsed = '06.09.2016';
var stripParenthesis = /\s*\(.*?\)\s*/g;

// todo rename data (index isn't needed)
dd.forEach(function(theater, index) {
    var theaterName = theater.name.replace(stripParenthesis, '');
    // TODO: get theater id from DB
    var theaterId = index;

    //console.log(theaterName);
    //for each film, get film id (or save it)
    // add showtimes (new timestamp, theaterId, filmId)
    theater.films.forEach(function(film, i){
        // console.log(' ');
        // question - get the Omu/.../etc and save that??
        var filmTitle = film.title.replace(stripParenthesis, '');
        var filmId = i;

        film.times.forEach(function(time){
            var t = moment(dateUsed + ' ' + time, "DD.MM.YYYY HH:mm");
            console.log('save: theater:' + theaterName + ', film:' + filmTitle + ', time:', t.format('X'));
            // 'save: theater:' + theaterId + ', film:' + filmId + ', time:', t.format('X');
        });
    });

});



//////////////////////

module.exports = [{
'name': 'Acud Kino (Mitte)',
'films': [
{ 'title': '1001 Nacht - Teil 3: Der Entzückte (OmU)', 'times': ["20:00"] },
{ 'title': 'Meine Brüder und Schwestern im Norden (OmU)', 'times': ["18:00"] },
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