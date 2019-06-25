import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import { PassportLocalSchema } from "mongoose";

export interface IUser extends mongoose.Document {
    username: String;
    password: String;
    admin: Boolean;
}

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    admin: {type: Boolean, default: false}
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model<IUser>("User", userSchema as PassportLocalSchema);

export default User;
