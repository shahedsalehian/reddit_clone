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

//autopopulate helper function to populate the comment's comments
//then move on to the next callback function
const autoPopulate = function(next){
	this.populate('comments');
	next();
}

//run autopopulation of the comment schema before findOne or find are run
CommentSchema.pre('findOne', autoPopulate).pre('find', autoPopulate);

module.exports = mongoose.model("Comment", CommentSchema);
 