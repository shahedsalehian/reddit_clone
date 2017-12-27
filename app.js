// packages
const express 			  = require("express");
const mongoose 			  = require("mongoose");
const bodyParser 		  = require("body-parser");
const methodOverride	= require("method-override");
const app 				    = express();

//models
const User 				  = require("./models/user");
const Article 			= require("./models/article");
const Sub 				  = require("./models/sub");
const Comment 			= require("./models/comment");

//Routes
const indexRoutes 	= require("./routes/index");
const subRoutes 		= require("./routes/sub");
const articleRoutes    = require("./routes/article");

//MongoDB Config
mongoose.connect("mongodb://localhost/reddit", {useMongoClient: true});
mongoose.Promise = global.Promise;
// mongoose.set('debug', true)

//app Config
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// define where static files should be served from
app.use(express.static(__dirname + "/public"));

//Routes use
app.use("/", indexRoutes);
app.use("/subs", subRoutes);
app.use("/subs/:id/articles", articleRoutes);
//app.use("/subs/:id/posts/:post_id/comments", commentRoutes);

// Server startup
const port = (process.env.PORT || 3000);

app.listen(port, function(req,res){
    console.log(`Server started on port ${port}`);
});
