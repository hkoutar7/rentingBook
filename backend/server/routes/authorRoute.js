const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Author } = require("./../models/authorModel");

/**
 * @desc   : Get All The authors
 * @route  : /api/v1/authors
 * @method : GET
 * @access : public
 */

router.get("/" , asyncHandler( 
    async(req, res) => {
        let authors = await Author.find()
                        .sort({firstName : 1,lastName : 1 })
                        .select("-__v -updatedAt -createdAt");
        res.status(200).json({
            data: authors,
            statusCode: 200,
            message: "The authors'be been fetched successfully from the DB.",
        });
    }
));

/**
 * @desc   : Get One Author
 * @routes : /api/v1/authors/:id
 * @method : GET
 * @access : public
 */

router.get("/:id", asyncHandler ( 
    async(req, res) => {
        let idAuthor = req.params.id;
        let author = await Author.findById(idAuthor)
                        .sort({ firstName : 1,lastName : 1 })
                        .select("-__v -updatedAt -createdAt");
        if (author)
            res.status(200).json({
                data: author,
                message: "the author've been fetched successfully .",
                statusCode: 200,
            });
        else 
            res.status(404).json({
                message: "Author unfound.",
                statusCode: 404,
            });
    }
));

/**
 * @desc   : Store An Author
 * @routes : /api/v1/authors
 * @method : POST
 * @access : public
 */

router.post("/" , async(req, res) => {

    let { firstName, lastName, bio, nationality, occupation, publishWorks } = req.body;
    
    try {
        let newAuthor = new Author({
            firstName,
            lastName,
            bio,
            nationality,
            occupation,
            publishWorks,
        });

        const author = await newAuthor.save();
        res.status(201).json({
            data : author,
            message: "The author've been stored successfully to the DB",
            statusCode: 201,
        });
        
    } catch (error) {
        res.status(500).json({
            message: "An error occurs while storing the author to the DB",
            statusCode: 500,
            errorMessage: error["message"],
        });
        console.log(`An error occurs while storing the author to the DB.`);
    }

});

/**
 * @desc   : Update An Author
 * @routes : /api/v1/authors/id
 * @method : PUT
 * @access : public
 */

router.put("/:id" ,async(req, res) => {

    try {
        let { firstName, lastName, bio, nationality, occupation, publishWorks } = req.body;
        let authorId = req.params.id;
        let author = await Author.findById(authorId);

        if (author){
            let newAuthor = await Author.findOneAndUpdate(
                {_id : authorId},
                {$set : { firstName, lastName, bio, nationality, occupation, publishWorks  } },
                { new : true },
            );
            res.status(201).json({
                data: newAuthor,
                message: "The author've been updated successfully to the DB",
                statusCode: 201,
            });
        }
        else 
            res.status(404).json({
                message: "author unfound.",
                statusCode: 404,
            });

    } catch (error) {
        res.status(500).json({
            message: "An error occurs while updating the author to the DB",
            statusCode: 500,
            errorMessage: error["message"],
        });
        console.log(`An error occurs while updating the author to the DB.`);
    }

});

/**
 * @desc   : Delete An Author
 * @routes : /api/v1/authors/id
 * @method : DELETE
 * @access : public
 */

router.delete("/:id", async(req, res) => {

    try {
        let authorId = req.params.id;
        let author = await Author.findById(authorId);

        if (author){
            await author.deleteOne();
            res.status(200).json({
                message: "The author've been deleted successfull from the DB",
                statusCode: 200,
            });
        }
        else 
            res.status(404).json({
                message: "author unfound.",
                statusCode: 404,
            });
            
    } catch (error) {
        res.status(500).json({
            message: "An error occurs while deleting the author from the DB",
            statusCode: 500,
            errorMessage: error["message"],
        });
        console.log(`An error occurs while deleting the author from the DB.`);
    }
});


module.exports  = router;
