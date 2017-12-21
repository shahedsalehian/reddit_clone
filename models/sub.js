const mongoose = require("mongoose");

const SubSchema	= new mongoose.Schema({
	posts: [ {type: mongoose.Schema.Types.ObjectId, ref: "Post"}]
});

module.exports = mongoose.model("Sub", SubSchema);