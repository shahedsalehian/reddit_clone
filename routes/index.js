const express = require("express");
const router  = express.Router();
const User    = require("../models/user");


router.get("/", function(req,res){
    res.send("all subreddits");
})

router.get("/signup",function(req,res) {
    res.send("SIGN-UP PAGE");
})

router.get("/login", function(req,res){
    res.send("LOGIN PAGE");
})

module.exports = router;