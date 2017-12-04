var express = require("express");
var router  = express.Router();
var User    = require("../models/user");


router.get("/", function(req,res){
    res.send("INDEX PAGE");
})

router.get("/s/:sub", function(req,res){
    var sub = req.params.sub;
    res.send(sub + " Subreddit");
})

router.get("/signup",function(req,res) {
    res.send("SIGN-UP PAGE");
})

router.get("/login", function(req,res){
    res.send("LOGIN PAGE");
})

module.exports = router;