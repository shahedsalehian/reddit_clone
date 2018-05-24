const Post    = require("../models/post");
const Comment = require("../models/comment");
const User    = require("../models/user");
const Sub     = require('../models/sub');
const moment  = require('moment');
const express = require("express");
const router  = express.Router({
  mergeParams: true // merge params from all the defined models
});
const middleware = require("../middleware");

// NEW REPLY
router.get("/new", middleware.isLoggedIn, function(req,res){
  Sub.findById(req.params.id, function(err,sub){
    if(err){
      console.log(err);
    }else{
      Post.findById(req.params.post_id,function(err,post){
          if(err){
            console.log(err);
          }else{
            Comment.findById(req.params.comment_id,function(err,comment){
              if(err){
                console.log(err);
              }else{
                res.render('replies/new', {post: post, comment: comment, sub: sub});
              }
            });
          }
      });
    }
  });
});

// CREATE
router.post("/", function(req,res){
  Comment.findById(req.params.comment_id, function(err,comment){
    if(err){
      console.log(err);
    }else{
      console.log(`Comment to which we are replying: ${comment}`);
      Comment.create(req.body.reply, function(err,reply){
        console.log(`Reply to the comment: ${reply}`);
        if(err){
          console.log(err);
        }else{
          comment.comments.push(reply);
          comment.save();
          res.redirect(`/s/${req.params.id}/posts/${req.params.post_id}`);
        }
      });
    }
  });
});

module.exports = router;
