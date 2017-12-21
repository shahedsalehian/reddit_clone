const mongoose = require("mongoose");

const SubSchema	= new mongoose.Schema({
	subname: String,
	posts: [ {type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
});

module.exports = mongoose.model("Sub", SubSchema);