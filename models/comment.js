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
	comments: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'} ]
},{
	usePushEach: true
});

let autoPopulate = function(next){
	this.populate('comments');
	next();
}

CommentSchema.pre('findOne', autoPopulate).pre('find', autoPopulate);

module.exports = mongoose.model("Comment", CommentSchema);
 