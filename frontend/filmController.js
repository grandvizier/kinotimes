var logger = new (require('../utils/logger.js'));
var db = new (require('../utils/Database.js'));
var _ = require('lodash');

var router = require("express").Router();
router.route("/films/:id?").get(getFilms);

function getFilms(req, res) {
    db.getAllFilms(function (err, films) {
        if (err){
            res.send(err);
        } else {
            res.json(films);
        }
    });
}

module.exports = router;