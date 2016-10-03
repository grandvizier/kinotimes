var $ = require("jquery");
var promise = require("es6-promise");
var resourceUrl = "/adminapi/projectionist/admin";

module.exports = {
    addImdbId: function (film) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceUrl,
                data: JSON.stringify(film),
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                success: resolve,
                error: reject
            });
        });
    }
}