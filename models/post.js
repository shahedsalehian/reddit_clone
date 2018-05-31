const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: String,
    text: String,
    createdAt: Date,
    updatedAt: Date,
    score: {type: Number, default: 0},
    comments_count: {type: Number, default: 0},
    author: {
     	id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
       },
    	username: String
    },
    comments: [
      {
			  type: mongoose.Schema.Types.ObjectId,
			  ref: "Comment"
      }
    ],
    sub: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sub"
        },
      name: String
    },
},{
  usePushEach: true
});

module.exports = mongoose.model("Post", PostSchema);
