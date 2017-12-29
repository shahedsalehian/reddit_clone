const express = require("express");
const router  = express.Router();
const passport = require("passport");
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

//SIGNUP FORM
router.get("/signup",function(req,res) {
    res.render("signup");
});

//SIGNUP LOGIC
router.post("/signup", function(req,res){
	let newUser = new User({username: req.body.username});
  User.register(newUser,req.body.password, function(err,user){
    if(err){
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/signup");
    }
    passport.authenticate("local")(req,res,function(){
      req.flash("success", "Logged in as " + user.username);
      res.redirect("/");
    })
  })
});

//LOGIN FORM
router.get("/login", function(req,res){
    res.render("login");
});

//LOGIN LOGIC
router.post("/login", passport.authenticate("local",{
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
}),function(req,res){
});

//LOGOUT LOGIC
router.get("/logout", function(req,res){
  req.logout();
  req.flash("success", "Logged Out");
  res.redirect("/");
})

module.exports = router;
