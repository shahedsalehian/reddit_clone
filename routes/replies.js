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

// CREATE REPLY
router.post("/", function(req,res){
  Comment.findById(req.params.comment_id, function(err,comment){
    if(err){
      console.log(err);
    }else{
      Comment.create(req.body.reply, function(err,reply){
        if(err){
          console.log(err);
        }else{
          reply.author.id = req.user._id;
          reply.author.username = req.user.username;
          reply.createdAt = moment();
          reply.updatedAt = moment();
          reply.save();
          comment.comments.push(reply);
          comment.save();
          res.redirect(`/s/${req.params.id}/posts/${req.params.post_id}`);
        }
      });
    }
  });
});

module.exports = router;
