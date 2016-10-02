var $ = require("jquery");
var promise = require("es6-promise");
var resourceUrl = "http://localhost:8888/api/";

module.exports = {
    getFilms: function () {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl+'films',
                method: "GET",
                dataType: "json",
                success: resolve,
                error: reject
            });
        });
    },
    getFilmsWithTimes: function () {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl,
                method: "GET",
                dataType: "json",
                success: resolve,
                error: reject
            });
        });
    }
}