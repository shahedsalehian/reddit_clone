const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const User = require("./models/user");
const Post = require("./models/post");
const Sub = require("./models/sub");
const Comment = require("./models/comment");


//Routes 
const indexRoutes = require("./routes/index");
const subRoutes = require("./routes/sub");

//Config
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


//MongoDB Config
mongoose.connect("mongodb://localhost/reddit", {useMongoClient: true});
mongoose.Promise = global.Promise;


//Routes use
app.use("/", indexRoutes);
app.use("/s/", subRoutes);


// Server startup
const port = (process.env.PORT || 3000);

app.listen(port, function(req,res){
    console.log(`Server started on port ${port}`);
})