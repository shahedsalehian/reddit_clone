const mongoose = require("mongoose");

const SubSchema	= new mongoose.Schema({
	name: String,
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post"
		}
	]
},{
	usePushEach: true
});

module.exports = mongoose.model("Sub", SubSchema);
