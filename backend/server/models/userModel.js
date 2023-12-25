const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
    },
    roles: [{
        type: String,
        enum: ["user", "admin"],
        default: ["user"],
    }],
    avatarImage: {
        type: String,
        trim: true,
        default: null,
    }},
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = {
    User,
};


