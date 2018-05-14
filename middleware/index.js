const Sub = require("../models/sub");
const Comment = require("../models/comment");
const Post = require("../models/post");
let middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login");
}

module.exports = middlewareObj;
