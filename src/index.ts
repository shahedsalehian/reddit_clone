// packages
import express, { Request, Response } from "express";
import mongoose             from "mongoose";
import bodyParser           from "body-parser";
import methodOverride       from "method-override";
import passport             from "passport";
import flash                from "connect-flash";
import passportLocal   from "passport-local";

const LocalStrategy         = passportLocal.Strategy;
const app 				    = express();

// models
import User             from "./models/user";
import { NextFunction } from "connect";

// routes
const indexRoutes 			= require("./routes/index");
const subRoutes 			= require("./routes/sub");
const postRoutes    		= require("./routes/post");
const commentRoutes 		= require("./routes/comment");
const repliesRoutes 		= require("./routes/replies");

// app config
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); // methodOverride for update/delete posts

// define where static files should be served from
app.use(express.static(__dirname + "/public"));

// use flash messages
app.use(flash());

// MongoDB Config
mongoose.connect("mongodb://db:27017/reddit", {useNewUrlParser: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

// passport config
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

// used to access request vars from all templates/views
app.use(function(req: Request, res: Response, next: NextFunction) {
  res.locals.currentUser = req.user;
  res.locals.error       = req.flash("error");
  res.locals.success     = req.flash("success");
  next();
});

// routes use
app.use("/", indexRoutes);
app.use("/s", subRoutes);
app.use("/s/:id/posts", postRoutes);
app.use("/s/:id/posts/:post_id/comments", commentRoutes);
app.use("/s/:id/posts/:post_id/comments/:comment_id/replies", repliesRoutes);

// Server startup
app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), () => {
    console.log(`Server started on port ${app.get("port")}`);
});
