#!/usr/bin/env node

var express = require("express");
var cors = require('cors');
var path = require("path");
var bodyParser = require("body-parser");
var db = new (require('../core/Database.js'));
var config = require('config').get('App');

var whitelist = [config.app.base_url, 'http://kinotimes-web-kinotimes.apps.pspc.ws', 'http://kinotimes.tk']
var corsOptions = {
	origin: function (origin, callback) {
		let approved = whitelist.filter(function( validUrl ) {
			// TODO: call error - nobody should be calling api directly
			return (origin) ? origin.indexOf(validUrl) !== -1 : true;
		});
		if (approved.length) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
}

//controllers
var filmController = require("./filmController");
var projectionistController = require("./projectionistController");

//Express request pipeline
var app = express();
app.use(express.static(path.join(__dirname, "../build")));
app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use("/api", filmController);
app.use("/adminapi", projectionistController);

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(8888,function(){
    console.log("Started listening on port", 8888);
});

db.connect();
