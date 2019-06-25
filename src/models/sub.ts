import mongoose from "mongoose";
import { IPost } from "./post";

export interface ISub extends mongoose.Document {
    name: String;
    posts: Array<IPost>;
}

const subSchema	= new mongoose.Schema({
    name: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
}, {
    usePushEach: true
});

const Sub = mongoose.model<ISub>("Sub", subSchema);
export default Sub;