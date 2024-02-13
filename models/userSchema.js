const { Schema, model } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    is_created: {
        type: String,
        default: Date.now(),
    }
});

userSchema.plugin(passportLocalMongoose);

exports.User = model("User", userSchema);
