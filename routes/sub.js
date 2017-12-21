const express = require("express");
const router  = express.Router();
const User    = require("../models/user");


router.get("/:sub", function(req,res){
    const sub = req.params.sub;
    res.render("sub");
})

router.get("/:sub/submit", function(req,res){
	res.send("Submit your post here");
});

router.post("/:sub/submit", function(req,res){
	res.send("Post submitted");
});


module.exports = router;