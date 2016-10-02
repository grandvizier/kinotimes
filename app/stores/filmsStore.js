var dispatcher = require("../dispatcher");
var filmService = require("../services/filmService");

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

    function addImbdId(film) {
        filmService.addImbdId(film).then(function (res) {
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
                case "addImbdId":
                    addImbdId(payload.film);
                    break;
            }
        }
    });

    return {
        onChange: onChange
    }
}

module.exports = FilmStore();