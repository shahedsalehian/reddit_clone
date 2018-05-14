const express = require('express');
const router = express.Router({
  mergeParams: true // merge params from all the defined models
});
const Sub = require('../models/sub');
const Article = require('../models/article');
const moment = require('moment');
const middleware = require("../middleware");


//NEW ARTICLE
router.get("/new",middleware.isLoggedIn, function(req,res){
  Sub.findById(req.params.id, function(err, sub){
    if(err){
      console.log(err);
    }else{
      res.render("articles/new", {sub: sub});
    }
  });
});

//CREATE NEW ARTICLE
router.post("/",middleware.isLoggedIn, function(req,res){
  Sub.findById(req.params.id, function(err,sub){
    if(err){
      console.log(err);
      res.redirect("/s");
    }else{
      Article.create(req.body.article, function(err,article){
        if(err){
          console.log(err);
        }else{
            article.author.id = req.user._id;
            article.author.username = req.user.username;
            article.sub.id = sub.id;
            article.sub.name = sub.name;
            article.time = moment().format("dddd, MMMM Do YYYY");
            article.save()
            sub.articles.push(article);
            sub.save();
            res.redirect("/s/" + sub._id);
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


//DELETE Article
router.delete("/:article_id", middleware.isLoggedIn, function(req,res){
  Sub.findById(req.params.id, function(err,sub){
    if(err){
      console.log(err);
      res.redirect("/s");
    }else{
      Article.findByIdAndRemove(req.params.article_id, function(err,article){
        if(err){
          console.log(err);
          res.redirect("/s/"+ sub._id);
        }else{
          res.redirect("/s/" + sub._id);
        }
      });
    }
  });
});

// EDIT ARTICLE
router.get("/:article_id/edit", middleware.isLoggedIn, function(req,res){
  Sub.findById(req.params.id, function(err,sub){
    if(err){
      console.log(err);
      res.redirect("/s");
    }else{
      Article.findById(req.params.article_id, function(err, article){
        if(err){
          console.log(err);
          res.redirect("/s");
        }else{
          res.render("articles/edit", {article: article, sub: sub});
        }
      });
    }
  });
});

router.put("/:article_id", middleware.isLoggedIn, function(req,res){
  Sub.findById(req.params.id, function(err,sub){
    if(err){
      console.log(err);
      res.redirect("/s");
    }else{
      Article.findByIdAndUpdate(req.params.article_id, req.body.article, function(err,article){
        if(err){
          console.log(err);
          res.redirect("/s");
        }else{
          res.redirect("/s/" + sub.id +"/articles/" + req.params.article_id);
        }
      });
    }
  });
});

module.exports = router;
