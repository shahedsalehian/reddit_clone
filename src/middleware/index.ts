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

middlewareObj.checkCommentOwnership = function(req,res,next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err,comment){
      if(err){
        console.log(err);
        res.redirect("back");
      }else{
        if(comment.author.id.equals(req.user._id)){
          next();
        }else{
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  }else{
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
}


middlewareObj.checkPostOwnership = function(req,res,next){
  if(req.isAuthenticated()){
    Post.findById(req.params.post_id, function(err,post){
      if(err){
        console.log(err);
        res.redirect("back");
      }else{
        if(post.author.id.equals(req.user._id)){
          next();
        }else{
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  }else{
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
}

module.exports = middlewareObj;
