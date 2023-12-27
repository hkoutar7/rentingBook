import React, { useEffect } from 'react'
import BreadcrumbExample from '../../components/bookComponents/breadCrumb';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBook, fetchBooks } from '../../rtk/reducers/bookReducer';
import BookCoverDefault from "./../../assets/images/book/bookCoverDefault.jpg";
import { IoIosAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";

import "./../../assets/styles/book/indexBook.css";
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

function IndexBook() {
    
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let books = useSelector((state) => state.book.books);
    let booksNumber = useSelector((state) => state.book.booksNumber);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchBooks());
            } catch (error) {
                console.log(`There's an issue in fetching authors: ${error}`);
            }
        };
        fetchData();
    }, [dispatch]);


    let getBookDescription = (desc) => {
        
        return desc.length > 80 ? `${String(desc).slice(0, 80)} ...` : desc;
    }

    let formatDate = (inputDate) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = new Date(inputDate).toLocaleDateString(
            "en-US",
            options
        );
        return formattedDate;
    }

    let getAvailability = (isAvailable) => {
        return isAvailable ? <span style={{color : "green"}}>Book Available</span> : <span style={{color : "red"}}>Book Not Available</span>;
    };

    let getCoverImage = (coverImage) => {
        if (coverImage === null) 
            return <img src={BookCoverDefault} alt="Default Cover" width={"100px"} />;
        else
            return <img src={coverImage} alt="Book Cover" width={"100px"} />;
    };

    let handleBookDelete = (bookId , bookTitle) => {

    Swal.fire({
        title: `Delete Book ${bookTitle}`,
        text: `Are you sure you want to delete ${bookTitle}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
            dispatch(deleteBook(bookId));
            Swal.fire({
                title: "Deleted Successfully!",
                text: `${bookTitle} has been deleted successfully`,
                icon: "success",
            });
        }
    });
    }


    return (
        <div id="bookPageIndex" className='mt-5'>
            <BreadcrumbExample />

            <div className="title">
                <h4>Explore <span>{booksNumber}</span> captivating books crafted by talented authors</h4>
                <p>Dive into a world of imagination and discovery, as each book takes you on a unique journey.</p>
            </div>

            <div className='addBook'>
                <button onClick={() => navigate("/ourBooks/AddBook")} > 
                    <span>Add Book</span>
                    <IoIosAdd />
                </button>
            </div>
            
            <div className="row" style={{ rowGap: "10px"}}>
                {Array.isArray(books) && books.length > 0 ? (
                    books.map((book) => (
                        <div className="col-md-6 bookHolder" key={book._id}>
                            <div className="book-container">
                                <div className='row'>
                                    <div className='col-4'> 
                                        { getCoverImage(book.coverImage) }
                                    </div>
                                    <div className='col-8'>
                                        <h1 className="book-title">{book.title}</h1>
                                        <p className="book-author">by : {book.author}</p>
                                        <p className="book-summ">A summary of the book :</p>
                                        <p className="book-description">{getBookDescription(book.description)}</p>
                                        <p className="book-genre">Genre: <span>{book.genre}</span></p>
                                        <p className="book-publ">Publication Date: <span>{formatDate(book.publicationDate)}</span></p>
                                        <p className="book-info">{getAvailability (book.isAvailable)}</p>    
                                    </div>
                                    <div className="operations">
                                        <div  ><FaEye onClick={() => navigate(`/ourBooks/${book._id}`) } /></div>
                                        <div  ><FaPencilAlt onClick={() => navigate(`/ourBooks/EditBook/${book._id}`)} /></div>
                                        <div onClick={() => handleBookDelete(book._id, book.title)}  ><FaTrashAlt /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>



        </div>
    );
}

export default IndexBook