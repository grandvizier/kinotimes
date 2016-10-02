var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var db = new (require('../utils/Database.js'));

//controllers
var filmController = require("./filmController");

//Express request pipeline
var app = express();
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json())
app.use("/api", filmController);

app.listen(8888,function(){
    console.log("Started listening on port", 8888);
});

db.connect();
