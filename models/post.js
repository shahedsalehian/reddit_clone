const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    time: String,
    author: {
     	id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    	username: String
    },
    comments: [ type: mongoose.Schema.Types.ObjectId, ref: "Comment" ],

});

module.exports = mongoose.model("Post", PostSchema);