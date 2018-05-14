const express = require("express");
const router  = express.Router();
// const User    = require("../models/user");
const Sub     = require("../models/sub");
const moment = require('moment');
const middleware = require("../middleware");


//INDEX
router.get("/", function(req,res){
	Sub.find({}, function(err, subs){
	   	if(err){
	   		console.log(err);
	   	}else{
	  		res.render("subs/index", {subs: subs});
	   	}
   })
});

//NEW
router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("subs/new");
});

//SHOW
router.get("/:id", function(req,res){
	Sub.findById(req.params.id).populate("posts").exec(function(err,foundSub){ //the "posts" from the populate function is defined in the sub model
		if(err){
			console.log(err);
		}else{
			res.render("subs/show",{sub: foundSub});
		}
	});
});

//CREATE
router.post("/",middleware.isLoggedIn, function(req,res){
	var name = req.body.name;
	var newSub = {name: name};
	Sub.create(newSub, function(err, newlyCreatedSub){
		if(err){
			console.log(err);
		}else{
			res.redirect("/");
		}
	});
});

//EDIT
router.get("/:id", middleware.isLoggedIn, function(req,res){
	res.render("edit");
});

//UPDATE


//DELETE


module.exports = router;
