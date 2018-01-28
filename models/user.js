const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    admin: {type: Boolean, default: false},
    subs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sub"}]
},{
	usePushEach: true
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
