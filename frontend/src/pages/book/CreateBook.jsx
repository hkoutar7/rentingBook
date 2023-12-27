import React, { useState } from "react";
import "./../../assets/styles/book/createBook.css"; // Import your custom CSS file
import { useDispatch } from "react-redux";
import { addBook } from "../../rtk/reducers/bookReducer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CreateBook() {
    let dispatch = useDispatch();
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

    const isFormValid = () => {
        return Object.values(formData).every((value) => value !== "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            let sendData = async (formData) => {
                try {
                    let res = await dispatch(addBook(formData));
                    console.log(res)
                    Swal.fire({
                        title: "Good job!",
                        text: "Book Added Successfully" + res.payload.data.title,
                        icon: "success",
                    });
                    navigate("/ourBooks");
                } catch (error) {
                    console.error("Error adding member:", error);
                }
            }

            sendData(formData);
        } else {
            console.log("Please fill in all fields before submitting.");
        }

    };

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
                    
                    <button type="submit" disabled={!isFormValid()}>
                        Create Book
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateBook;
