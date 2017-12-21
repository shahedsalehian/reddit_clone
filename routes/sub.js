const express = require("express");
const router  = express.Router();
const User    = require("../models/user");


router.get("/s/:sub", function(req,res){
    const sub = req.params.sub;
    res.send(sub + " Subreddit");
})


module.exports = router;