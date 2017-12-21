const express = require("express");
const router  = express.Router();
const User    = require("../models/user");


router.get("/s/:sub", function(req,res){
    const sub = req.params.sub;
    res.send(sub + " Subreddit");
})

router.get("/submit", function(req,res){
	res.send("Submit your post here");
});

router.post("/submit", function(req,res){
	res.send("Post submitted");
});


module.exports = router;