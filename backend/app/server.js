#!/usr/bin/env node

var express = require("express");
var cors = require('cors');
var path = require("path");
var bodyParser = require("body-parser");
var db = new (require('../core/Database.js'));

let port = process.env.REACT_APP_KT_BACKEND_PORT
let localUrl = process.env.REACT_APP_KT_URL + ":" + process.env.REACT_APP_KT_PORT

var whitelist = [localUrl, 'http://kinotimes.tk']
var corsOptions = {
	origin: function (origin, callback) {
		callback(null, true); // try removing the CORS check while in development phase
		// let approved = whitelist.filter(function( validUrl ) {
		// 	// TODO: call error - nobody should be calling api directly
		// 	return (origin) ? origin.indexOf(validUrl) !== -1 : true;
		// });
		// if (approved.length) {
		// 	callback(null, true)
		// } else {
		// 	callback(new Error('Not allowed by CORS'))
		// }
	}
}

//controllers
var filmController = require("./filmController");
var projectionistController = require("./projectionistController");

//Express request pipeline
var app = express();
app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use("/api", filmController);
app.use("/adminapi", projectionistController);

app.listen(port, function(){
    console.log("Started listening on port", port);
});

db.connect();
