var dispatcher = require("../dispatcher");
var filmService = require("../services/filmService");
var projectionistService = require("../services/projectionistService");

function FilmStore() {
    var listeners = [];

    function onChange(listener) {
        getFilms(listener);
        listeners.push(listener);
    }

    function getFilms(cb) {
        filmService.getFilms().then(function (res) {
            cb(res);
        });
    }

    function addImdbId(film) {
        projectionistService.addImdbId(film).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    function triggerListeners() {
        getFilms(function (res) {
            listeners.forEach(function (listener) {
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(":");
        if (split[0] === "film") {
            switch (split[1]) {
                case "addImdbId":
                    addImdbId(payload.film);
                    break;
            }
        }
    });

    return {
        onChange: onChange
    }
}

module.exports = FilmStore();