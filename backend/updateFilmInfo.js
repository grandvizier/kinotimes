// ftp://ftp.fu-berlin.de/pub/misc/movies/database/


var dd = require('./data.js'),
qs = require('querystring'),
request = require('request');

var stripParenthesis = /\s*\(.*?\)\s*/g;
var films = [];

var imbd_url = "http://www.imdb.com/xml/find?json=1&nr=1&tt=on&q=";
var ombd_url = "http://www.omdbapi.com/";

// holder for getting all the films
dd.forEach(function(theater, index) {
    var theaterName = theater.name.replace(stripParenthesis, '');
    theater.films.forEach(function(film, i){
        var filmTitle = film.title.replace(stripParenthesis, '');
        if (films.indexOf(filmTitle) == -1) {
            films.push(filmTitle);
        }
    });
});

//IMBD
// films.forEach(function(title){
// var url = imbd_url + title.replace(/ /g, '+');
// console.log(url);
// request({uri: url}, function(err, response, body){
// if(err && response.statusCode !== 200){
// console.error(err);
// console.log('Request error.', response);
// return;
// }
// film_details = JSON.parse(body);
// if (film_details.title_exact) {
// console.log(film_details.title_exact[0].title);
// console.log(film_details.title_exact[0].title_description);
// } else if (film_details.title_approx) {
// film_details.title_approx.forEach(function(titleApprox){
// console.log(' ', titleApprox.title);
// console.log(' ', titleApprox.title_description);
// });
// } else {
// console.log(film_details);
// }
// console.log('---------------');
// });
// });


//OTHER
films.forEach(function(title){
    var url = ombd_url + '?t='+ title + '?type=movie';
    console.log(url);
    request({uri: url}, function(err, response, body){
        if(err && response.statusCode !== 200){
            console.error(err);
            console.log('Request error.', response);
            return;
        }
        film_details = JSON.parse(body);
        console.log(film_details);
        console.log('---------------');
    });
});