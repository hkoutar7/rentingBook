const express = require("express");
const router = express.Router();
const {Book} = require("./../models/bookModel");

/**
 * @desc   : Get All The Books
 * @routes : /api/v1/books
 * @method : GET
 * @access : public
 */

router.get("/" , async(req, res) => {

    try {
        let books = await Book.find()
                .sort({ title : 1,author : 1})
                .select("-__v -createdAt -updatedAt");
        res.status(200).json({
            data : books,
            message: "The books'be been fetched successfully from the DB.",
            statusCode: 200,
        });

    } catch (error) {
        res.status(500).json({
            message : "An error occurs while fetching books from the DB",
            statusCode : 500,
            errorMessage : error,
        });
        console.log(`An error occurs while fetching books from the DB.`);
    }
});

/**
 * @desc   : Get One Book
 * @routes : /api/v1/books/:id
 * @method : GET
 * @access : public
 */

router.get("/:id", async(req, res) => {

    try {
        let idBook = req.params.id;
        let book = await Book.findById(idBook)
                        .sort({ title : 1,author : 1 })
                        .select("-__v -updatedAt -createdAt");
        if (book)
            res.status(200).json({
                data: book,
                message: "the book've been fetched successfully .",
                statusCode: 200,
            });
        else 
            res.status(404).json({
                message: "Book unfound.",
                statusCode: 404,
            });

    } catch (error) {
        res.status(500).json({
            message: "An error occurs while fetching The book from the DB",
            statusCode: 500,
            errorMessage: error["message"],
        });
        console.log(`An error occurs while fetching The book from the DB.`);
    }

});

/**
 * @desc   : Store A Book
 * @routes : /api/v1/books
 * @method : POST
 * @access : public
 */

router.post("/" , async(req, res) => {

    let { title, description, author, publicationDate, genre } = req.body;
    
    try {
        let newBook = new Book({
            title,
            description,
            author,
            publicationDate,
            genre,
        });

        const book = await newBook.save();
        res.status(201).json({
            data : book,
            message: "The book've been stored successfully to the DB",
            statusCode: 201,
        });
        
    } catch (error) {
        res.status(500).json({
            message: "An error occurs while storing the book to the DB",
            statusCode: 500,
            errorMessage: error["message"],
        });
        console.log(`An error occurs while storing the book to the DB.`);
    }

});

/**
 * @desc   : Update A Book
 * @routes : /api/v1/books/id
 * @method : PUT
 * @access : public
 */

router.put("/:id" ,async(req, res) => {

    
    try {
        let { title, description, author, publicationDate, genre } = req.body;
        let bookId = req.params.id;
        let book = await Book.findById(bookId)
        
        if (book){
            let newBook = await Book.findOneAndUpdate(
                {_id : bookId},
                {$set : { title, description, author, publicationDate, genre } },
                { new : true },
            );
            res.status(201).json({
                data : newBook,
                message: "The book've been updated successfully to the DB",
                statusCode: 201,
            });
        }
        else 
            res.status(404).json({
                message: "book unfound.",
                statusCode: 404,
            });

    } catch (error) {
        res.status(500).json({
            message: "An error occurs while updating the book to the DB",
            statusCode: 500,
            errorMessage: error["message"],
        });
        console.log(`An error occurs while updating the book to the DB.`);
    }

});

/**
 * @desc   : Delete A Book
 * @routes : /api/v1/books/id
 * @method : DELETE
 * @access : public
 */

router.delete("/:id", async(req, res) => {

    try {
        let bookId = req.params.id;
        let book = await Book.findById(bookId);

        if (book){
            await book.deleteOne();
            res.status(200).json({
                message: "The book've been deleted successfull from the DB",
                statusCode: 200,
            });
        }
        else 
            res.status(404).json({
                message: "book unfound.",
                statusCode: 404,
            });
            
    } catch (error) {
        res.status(500).json({
            message: "An error occurs while deleting the book from the DB",
            statusCode: 500,
            errorMessage: error["message"],
        });
        console.log(`An error occurs while deleting the book from the DB.`);
    }

});

module.exports = router;
