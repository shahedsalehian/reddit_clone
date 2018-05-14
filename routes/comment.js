const express = require('express');
const router = express.Router({
  mergeParams: true // merge params from all the defined models
});
// const Sub = require('../models/sub');
const Article = require('../models/article');
const Comment = require('../models/comment');
const moment = require('moment'); // to display time
const middleware = require("../middleware");

//CREATE NEW COMMENT
router.post("/",middleware.isLoggedIn,function(req,res){
  Article.findById(req.params.article_id, function(err,article){
    if(err){
      console.log(err);
      res.redirect("/s/"+ req.params.id +"/articles/"+req.params.article_id);
    }else{
      Comment.create(req.body.comment, function(err,comment){
        if(err){
          console.log(err);
        }else{
          comment.time = moment().format("dddd, MMMM Do YYYY");
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          article.comments.push(comment);
          article.save();
          res.redirect("/s/" + req.params.id + "/articles/" + article._id);
        }
      });
    }
  });
});



module.exports = router;
