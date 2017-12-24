const express = require("express");
const router  = express.Router();
// const User    = require("../models/user");
const Sub     = require("../models/sub");


//INDEX
router.get("/", function(req,res){
	Sub.find({}, function(err, subs){
	   	if(err){
	   		console.log(err);
	   	}else{
	  		res.render("subs/index", {subs: subs}); 		
	   	}
   })
 // res.render("subs/index");
});

//NEW
router.get("/new", function(req,res){
	res.render("subs/new");
});

//SHOW
router.get("/:id", function(req,res){
	// Sub.findById(req.params.id).exec(err,foundSub){
	// 	if(err){
	// 		console.log(err);
	// 	}else{
	// 		res.render("show",{sub: foundSub});
	// 	}
	// }
});

//CREATE
router.post("/", function(req,res){
	var subname = req.body.subname;
	var newSub = {subname: subname};
	Sub.create(newSub, function(err, newlyCreatedSub){
		if(err){
			console.log(err);
		}else{
			console.log(newlyCreatedSub);
			res.redirect("/subs");
		}
	});
});

//EDIT
router.get("/:id", function(req,res){
	res.render("show");
});

//UPDATE


//DELETE


module.exports = router;