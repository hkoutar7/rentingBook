const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({

    title : {
        type : String,
        required : true,
        trim : true,
        minlength : 1,
        maxlength : 50,
    },
    description : {
        type : String,
        required : true,
        trim : true,
        minlength : 1,
    },
    author : {
        type : String,
        required : true,
        trim : true,
        minlength : 1,
        maxlength : 50,
        default : null,
    },
    publicationDate : {
        type : Date,
        required : true,
    },
    genre : {
        type : String,
        required : true,
        trim : true,
        minlength : 1,
        maxlength : 50,
    },
    isAvailable :{
        type : Boolean,
        default : true,
    },
    renter : {
        type : String,
        default : null,
    },
    coverImage : {
        type : String,
        trim : true,
        default : null,
    },

},{
    timestamps : true,
});


const Book = mongoose.model("Book", bookSchema);

module.exports = {
    Book,
};
