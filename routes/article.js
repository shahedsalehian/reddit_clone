const express = require('express');
const router = express.Router({
  mergeParams: true // merge params from all the defined models
});
const Sub = require('../models/sub');
const Article = require('../models/article');
const moment = require('moment');


//NEW ARTICLE
router.get("/new", function(req,res){
  Sub.findById(req.params.id, function(err, sub){
    if(err){
      console.log(err);
    }else{
      res.render("articles/new", {sub: sub});
    }
  });
});

//CREATE NEW ARTICLE
router.post("/", function(req,res){
  Sub.findById(req.params.id, function(err,sub){
    if(err){
      console.log(err);
      res.redirect("/subs");
    }else{
      Article.create(req.body.article, function(err,article){
        if(err){
          console.log(err);
        }else{
            console.log(article);
            article.time = moment().format("dddd, MMMM Do YYYY");
            article.save()
            sub.articles.push(article);
            sub.save();
            console.log(sub);
            res.redirect("/subs/" + sub._id);
        }
      });
    }
  });
});

//SHOW ARTICLE
router.get("/:article_id", function(req,res){
  Article.findById(req.params.article_id).populate("comments").exec(function(err,article){
    if(err){
      console.log(err);
    }else{
      res.render("articles/show", {article: article, sub: req.params.id});
    }
  });
});


module.exports = router;