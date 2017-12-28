const express = require("express");
const router  = express.Router();
const User    = require("../models/user");
const Sub = require('../models/sub');


//Index Page for All subreddits
router.get("/", function(req,res){
  Sub.find({}, function(err,subs){
    if(err){
      console.log(err);
    }else{
      res.render("index", {subs: subs});
    }
  })
});

router.get("/signup",function(req,res) {
    res.render("signup");
});

router.post("/signup", function(req,res){
	res.send("signed up");
});

router.get("/login", function(req,res){
    res.render("login");
});

router.post("/login", function(req,res){
	res.send("logged in");
});

module.exports = router;
