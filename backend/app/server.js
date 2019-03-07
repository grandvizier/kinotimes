#!/usr/bin/env node

var express = require("express");
var cors = require('cors');
var path = require("path");
var bodyParser = require("body-parser");
var db = new (require('../core/Database.js'));
var graphqlHTTP = require('express-graphql');

let port = process.env.REACT_APP_KT_BACKEND_PORT
let localUrl = process.env.REACT_APP_KT_URL + ":" + process.env.REACT_APP_KT_PORT
let localServer = process.env.REACT_APP_KT_URL + ":" + port

var whitelist = [localUrl, localServer, 'http://kinotimes.tk']
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
var schema = require("./graphql/Schema");

//Express request pipeline
var app = express();
app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use("/api", filmController);
app.use("/adminapi", projectionistController);

app.use('/graphql', graphqlHTTP(function (req) {
  return {
    schema: schema,
    graphiql: true
  };
}));

app.listen(port, function(){
    console.log("Started listening on port", port);
});

db.connect();
