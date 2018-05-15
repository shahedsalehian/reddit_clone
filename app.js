// packages
const express 			  = require("express");
const mongoose 			  = require("mongoose");
const bodyParser 		  = require("body-parser");
const methodOverride	= require("method-override");
const passport        = require("passport");
const flash           = require("connect-flash");
const LocalStrategy   = require("passport-local");
const app 				    = express();

//models
const User 				  = require("./models/user");
const Post 			    = require("./models/post");
const Sub 				  = require("./models/sub");
const Comment 			= require("./models/comment");

//Routes
const indexRoutes 	= require("./routes/index");
const subRoutes 		= require("./routes/sub");
const postRoutes    = require("./routes/post");
const commentRoutes = require("./routes/comment");
const repliesRoutes = require("./routes/replies");

//app Config
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); // methodOverride for update/delete posts

// define where static files should be served from
app.use(express.static(__dirname + "/public"));
// use flash messages
app.use(flash());

//MongoDB Config
mongoose.connect("mongodb://localhost/reddit", {useMongoClient: true});
mongoose.Promise = global.Promise;
// mongoose.set('debug', true)

//Passport Config
app.use(require("express-session")({
  secret: "DOGGOD",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//used to access request vars from all templates/views
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error       = req.flash("error");
  res.locals.success     = req.flash("success");
  next();
})

//Routes use
app.use("/", indexRoutes);
app.use("/s", subRoutes);
app.use("/s/:id/posts", postRoutes);
app.use("/s/:id/posts/:post_id/comments", commentRoutes);
app.use("/s/:id/posts/:post_id/comments/:comment_id/replies", repliesRoutes);

// Server startup
const port = (process.env.PORT || 3000);
app.listen(port, function(req,res){
    console.log(`Server started on port ${port}`);
});
