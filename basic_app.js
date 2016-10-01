var express = require('express');
var app = express();

//DB setup
var mongoose = require('mongoose');
mongoose.connect("mongodb://mongo:27017");

app.get('/', function(req, res){
  res.send("kino times");
});
app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});