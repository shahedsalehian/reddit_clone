const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
	text: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	updatedAt: Date,
  createdAt: Date,
  comments: [ this ]
},{
	usePushEach: true
});

module.exports = mongoose.model("Comment", CommentSchema);
