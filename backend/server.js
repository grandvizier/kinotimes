var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var db = new (require('../core/Database.js'));

//controllers
var filmController = require("./filmController");
var projectionistController = require("./projectionistController");

//Express request pipeline
var app = express();
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json())
app.use("/api", filmController);
app.use("/adminapi", projectionistController);

app.listen(8888,function(){
    console.log("Started listening on port", 8888);
});

db.connect();
