const express = require('express');
const router = express.Router({
  mergeParams: true // merge params from all the defined models
});
const Sub = require('../models/sub');
const Post = require('../models/post');
const moment = require('moment');
const middleware = require("../middleware");


//NEW Post
router.get("/new",middleware.isLoggedIn, function(req,res){
  Sub.findById(req.params.id, function(err, sub){
    if(err){
      console.log(err);
    }else{
      res.render("posts/new", {sub: sub});
    }
  });
});

//CREATE NEW Post
router.post("/",middleware.isLoggedIn, function(req,res){
  Sub.findById(req.params.id, function(err,sub){
    if(err){
      console.log(err);
      res.redirect("/s");
    }else{
      Post.create(req.body.post, function(err,post){
        if(err){
          console.log(err);
        }else{
            post.author.id = req.user._id;
            post.author.username = req.user.username;
            post.sub.id = sub.id;
            post.sub.name = sub.name;
            post.time = moment().format("dddd, MMMM Do YYYY");
            post.save()
            sub.posts.push(post);
            sub.save();
            res.redirect("/s/" + sub._id);
        }
      });
    }
  });
});

//SHOW Post
router.get("/:post_id", function(req,res){
  Post.findById(req.params.post_id).populate('comments').exec(function(err,post){
    if(err){
      console.log(err);
    }else{
      res.render("posts/show", {post: post, sub: req.params.id});
    }
  });
});


//DELETE Post
router.delete("/:post_id", middleware.isLoggedIn, function(req,res){
  Sub.findById(req.params.id, function(err,sub){
    if(err){
      console.log(err);
      res.redirect("/s");
    }else{
      Post.findByIdAndRemove(req.params.post_id, function(err,post){
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

// EDIT Post
router.get("/:post_id/edit", middleware.isLoggedIn, function(req,res){
  Sub.findById(req.params.id, function(err,sub){
    if(err){
      console.log(err);
      res.redirect("/s");
    }else{
      Post.findById(req.params.post_id, function(err, post){
        if(err){
          console.log(err);
          res.redirect("/s");
        }else{
          res.render("posts/edit", {post: post, sub: sub});
        }
      });
    }
  });
});


// UPDATE Post
router.put("/:post_id", middleware.isLoggedIn, function(req,res){
  Sub.findById(req.params.id, function(err,sub){
    if(err){
      console.log(err);
      res.redirect("/s");
    }else{
      Post.findByIdAndUpdate(req.params.post_id, req.body.post, function(err,post){
        if(err){
          console.log(err);
          res.redirect("/s");
        }else{
          res.redirect("/s/" + sub.id +"/posts/" + req.params.post_id);
        }
      });
    }
  });
});

module.exports = router;
