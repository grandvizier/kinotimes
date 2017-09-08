#!/usr/bin/env node
var express = require("express");
var path = require("path");

let port = process.env.REACT_APP_KT_PORT

//Express request pipeline
var app = express();
app.use(express.static(path.join(__dirname, "build")));
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function(){
    console.log("Frontend listening on port", port);
});
