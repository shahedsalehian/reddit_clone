const mongoose = require("mongoose");

const SubSchema	= new mongoose.Schema({
	name: String,
	articles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Article"
		}
	]
},{
	usePushEach: true
});

module.exports = mongoose.model("Sub", SubSchema);
