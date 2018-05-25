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
        console.log(`Comment: ${comment}`)
        if(err){
          console.log(err);
        }else{
          comment.updatedAt = moment();
          comment.createdAt = moment();
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          post.comments.push(comment);
          post.save();
          res.redirect("/s/" + req.params.id + "/posts/" + post._id);
        }
      });
    }
  });
});



module.exports = router;
