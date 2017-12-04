var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();

var User = require("./models/user");

var indexRoutes = require("./routes/index");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb://localhost/reddit", {useMongoClient: true});
mongoose.Promise = global.Promise

app.use("/", indexRoutes);


app.listen("3000", function(req,res){
    console.log("Server started on port 3000");
})