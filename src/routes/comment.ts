const express = require('express');
const router = express.Router({
  mergeParams: true // merge params from all the defined models
});
// const Sub = require('../models/sub');
const Post = require('../models/post');
const Comment = require('../models/comment');
const moment = require('moment'); // to display time
const middleware = require("../middleware");

//CREATE NEW COMMENT
router.post("/",middleware.isLoggedIn,function(req,res){
  Post.findById(req.params.post_id, function(err,post){
    if(err){
      console.log(err);
      res.redirect("/s/"+ req.params.id +"/posts/"+post._id);
    }else{
      Comment.create(req.body.comment, function(err,comment){
        if(err){
          console.log(err);
        }else{
          comment.updatedAt = moment();
          comment.createdAt = moment();
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          post.comments.push(comment);
          post.comments_count++;
          post.save();
          res.redirect("/s/" + req.params.id + "/posts/" + post._id);
        }
      });
    }
  });
});

//EDIT COMMENT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
  Comment.findById(req.params.comment_id, function(err, comment){
    if(err){
      console.log(err);
    }else{
      res.render("comments/edit", {sub: req.params.id, post: req.params.post_id, comment: comment});
    }
  });
});
 
//UPDATE COMMENT
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,comment){
    if(err){
      console.log(err);
      res.redirect("/s");
    }else{
      comment.updatedAt = moment();
      comment.save();
      res.redirect("/s/" + req.params.id +"/posts/" + req.params.post_id);
    }
  });
});



//DELETE COMMENT
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
    if(err){
      console.log(err);
      res.redirect(`/s/${req.params.id}/posts/${req.params.post_id}`);
    }else{
      Post.findById(req.params.post_id, function(err,post){
        if(err){
          console.log(err);
        }else{
          post.comments_count--;
          post.save();
        }
      });
      res.redirect(`/s/${req.params.id}/posts/${req.params.post_id}`);
    }
  });
});

//UPVOTE COMMENT
router.post("/:comment_id/upvote", middleware.isLoggedIn, function(req,res){
  Comment.findById(req.params.comment_id, function(err,comment){
    if(err){
      console.log(err);
    }else{
      comment.score++;
      comment.save();

      res.redirect("/s/" + req.params.id + "/posts/" + req.params.post_id);
    }
  });
});

//DOWNVOTE COMMENT
router.post("/:comment_id/downvote", middleware.isLoggedIn, function(req,res){
  Comment.findById(req.params.comment_id, function(err,comment){
    if(err){
      console.log(err);
    }else{
      comment.score--;
      comment.save();
      res.redirect("/s/" + req.params.id + "/posts/" + req.params.post_id);
    }
  });
});

module.exports = router;
