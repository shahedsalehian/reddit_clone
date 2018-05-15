const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const Sub = require('../models/sub');
const express = require("express");
const router = express.Router({
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
  Post.findById(req.params.post_id, function(err,post){
    if(err){
      console.log(err);
    }else{
      let comment = post.comments.id(req.params.comment_id);
      let reply = req.body.comment;
      comment.comments.push(reply);
      post.save();
      res.redirect(`/s/${req.params.id}/posts/${req.params.post_id}`);
    }
  });
});

module.exports = router;
