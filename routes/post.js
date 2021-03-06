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
            post.updatedAt = moment();
            post.createdAt = moment();
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
      res.render("posts/show", {post: post, sub: req.params.id, moment: moment});
    }
  });
});


//DELETE Post
router.delete("/:post_id", middleware.checkPostOwnership, function(req,res){
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
router.get("/:post_id/edit", middleware.checkPostOwnership, function(req,res){
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
router.put("/:post_id", middleware.checkPostOwnership, function(req,res){
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
          post.updatedAt = moment();
          post.save();
          res.redirect("/s/" + sub.id +"/posts/" + req.params.post_id);
        }
      });
    }
  });
});


//UPVOTE POST
router.post("/:post_id/upvote", middleware.isLoggedIn, function(req,res){
  Post.findById(req.params.post_id, function(err,post){
    if(err){
      console.log(err);
      res.redirect("/s/" + req.params.id)
    }else{
      console.log(req.params);
      post.score++;
      post.save();
      res.redirect("/s/" + req.params.id);
    }
  });
});

//DOWNVOTE POST
router.post("/:post_id/downvote", middleware.isLoggedIn, function(req,res){
  Post.findById(req.params.post_id, function(err,post){
    if(err){
      console.log(err);
      res.redirect("/s/" + req.params.id)
    }else{
      console.log(req.params);
      post.score--;
      post.save();
      res.redirect("/s/" + req.params.id);
    }
  });
});

module.exports = router;
