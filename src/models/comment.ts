import mongoose from "mongoose";
import { IUser } from "./user";
import { NextFunction } from "express";

export interface IComment extends mongoose.Document {
    text: String;
    author: IUser;
    updatedAt: Date;
    createdAt: Date;
    score: Number;
    comments?: Array<IComment>;
}

const commentSchema = new mongoose.Schema({
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
    score: {type: Number, default: 0},
    comments: [ {type: mongoose.Schema.Types.ObjectId, ref: "Comment"} ]
}, {
    usePushEach: true
});

// autopopulate helper function to populate the comment's comments
// then move on to the next callback function
const autoPopulate = function(next: NextFunction) {
    this.populate("comments");
    next();
};

// run autopopulation of the comment schema before findOne or find are run
commentSchema.pre("findOne", autoPopulate).pre("find", autoPopulate);

const Comment = mongoose.model<IComment>("Comment", commentSchema);
export default Comment;