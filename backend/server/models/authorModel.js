const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
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
    bio: {
        type: String,
        required: true,
        default: "No biographie available for the moment", 
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50,
        default: "Unknown",
    },
    gender : {
        type : String,
        enum: ["male", "female"],
        default: "male",
    },
    occupation: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50,
        default: "author",
    },
    publishWorks: {
        type: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book" 
        }],
        default: [],
    },
    },
    {
        timestamps: true,
    }
);

const Author = mongoose.model("Author", authorSchema); 

module.exports = {
    Author,
};
