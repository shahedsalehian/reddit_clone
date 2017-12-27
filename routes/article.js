const express = require('express');
const router = express.Router({
  mergeParams: true // merge params from all the defined models
});
const Sub = require('../models/sub');
const Article = require('../models/article');

router.get("/new", function(req,res){
  Sub.findById(req.params.id, function(err, sub){
    if(err){
      console.log(err);
    }else{
      res.render("articles/new", {sub: sub});
    }
  });
});

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
            sub.articles.push(article);
            sub.save();
            console.log(sub);
            res.redirect("/subs/" + sub._id);
        }
      });
    }
  });
});



module.exports = router;
