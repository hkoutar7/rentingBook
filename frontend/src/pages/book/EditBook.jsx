import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, fetchBook, updateBook } from "../../rtk/reducers/bookReducer";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import "./../../assets/styles/book/createBook.css"; // Import your custom CSS file



function EditBook() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const book = useSelector((state) => state.book.books);

    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        author: "",
        publicationDate: "",
        genre: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await dispatch(updateBook( id, formData ));
            Swal.fire({
                title: "Good job!",
                text: "Book Updated Successfully",
                icon: "success",
            });
            navigate("/ourBooks");
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchBook(id));
            } catch (error) {
                console.log(`There's an issue in fetching book: ${error}`);
            }
        };
        fetchData();
    }, [dispatch])

        useEffect(() => {
            if (book) {
                setFormData({
                    title: book.title || "",
                    description: book.description || "",
                    author: book.author || "",
                    publicationDate: book.publicationDate || "",
                    genre: book.genre || "",
                });
            }
        }, [book]);


    return (
        <div id="bookPageCreate">
            <div className="create-book-container">
                <form onSubmit={handleSubmit}>

                    <div className="row">
                        <div className="col-md-6">
                            <label> Book's title </label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} />
                        </div>
                        <div className="col-md-5">
                            <label>Book's author </label>
                            <input type="text" name="author" value={formData.author} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <label> Genre </label>
                            <select name="genre" value={formData.genre} onChange={handleChange}>
                                <option value="">Select Genre</option>
                                <option value="romance">Romance</option>
                                <option value="mystery">Mystery</option>
                                <option value="fantasy">Fantasy</option>
                                <option value="science-fiction">Science Fiction</option>
                                <option value="adventure">Adventure</option>
                                <option value="historical">Historical</option>
                                <option value="thriller">Thriller</option>
                                <option value="horror">Horror</option>
                                <option value="drama">Drama</option>
                                <option value="comedy">Comedy</option>
                                <option value="action">Action</option>
                                <option value="non-fiction">Non-Fiction</option>
                            </select>
                        </div>
                        <div className="col-md-5">
                            <label>Publication date </label>
                            <input type="date" name="publicationDate" value={formData.publicationDate} onChange={handleChange}  />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <label> book's description </label>
                            <textarea name="description" value={formData.description} onChange={handleChange} />
                        </div>
                    </div>
                    
                    <button type="submit">
                        Validate The changes 
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditBook
