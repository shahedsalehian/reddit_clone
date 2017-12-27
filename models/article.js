const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    title: String,
    text: String
    //time: String,
    // author: {
    //  	id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // 	username: String
    // },
    // comments: [ {type: mongoose.Schema.Types.ObjectId, ref: "Comment"} ],

},{
  usePushEach: true
});

module.exports = mongoose.model("Article", ArticleSchema);
