const express = require('express');
const router = express.Router({
  mergeParams: true // merge params from all the defined models
});
const Sub = require('../models/sub');
const Post = require('../models/post');

router.get("/new", function(req,res){
  Sub.findById(req.params.id, function(err, sub){
    if(err){
      console.log(err);
    }else{
      res.render("posts/new", {sub: sub});
    }
  });
});

router.post("/", function(req,res){
  Sub.findById(req.params.id, function(err,sub){
    if(err){
      res.redirect("/subs");
    }else{
      Post.create(req.body.text, function(err,post){
        if(err){
          console.log(err);
        }else{
            console.log(post);
            sub.posts.push(post);
            sub.save();
            res.redirect("/subs/" + sub._id);
        }
      });
    }
  });
});



module.exports = router;
