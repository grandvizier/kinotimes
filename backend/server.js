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
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


app.use(bodyParser.json())
app.use("/api", filmController);
app.use("/adminapi", projectionistController);

app.listen(8888,function(){
    console.log("Started listening on port", 8888);
});

db.connect();
