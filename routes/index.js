const express = require("express");
const router  = express.Router();
const User    = require("../models/user");


router.get("/", function(req,res){
    res.render("landing");
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