import mongoose from "mongoose";
import { IUser } from "./user";
import { IComment } from "./comment";
import { ISub } from "./sub";

export interface IPost extends mongoose.Document {
    title:          String;
    text:           String;
    createdAt:      Date;
    updatedAt:      Date;
    score:          Number;
    comments_count: Number;
    author:         IUser["_id"];
    comments:       Array<IComment>;
    sub:            ISub["_id"];
}

const postSchema = new mongoose.Schema({
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
}, {
  usePushEach: true
});

const Post = mongoose.model<IPost>("Post", postSchema);
export default Post;