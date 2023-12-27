import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchBook } from "../../rtk/reducers/bookReducer";
import Breadcrumb from "../../components/bookComponents/breadCrumbTwo";
import BookCoverDefault from "./../../assets/images/book/bookCoverDefault.jpg";

import "./../../assets/styles/book/showBook.css"; // Import the CSS file

function ShowBook() {
    const { id } = useParams();

    let dispatch = useDispatch();
    let book = useSelector((state) => state.book.books);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchBook(id));
            } catch (error) {
                console.log(`There's an issue in fetching authors: ${error}`);
            }
        };
        fetchData();
    }, [dispatch]);

    let formatDate = (inputDate) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = new Date(inputDate).toLocaleDateString(
            "en-US",
            options
        );
        return formattedDate;
    };

    let getCoverImage = (coverImage) => {
        if (coverImage === null) 
            return <img src={BookCoverDefault} alt="Default Cover" width={"150px"} />;
        else
            return <img src={coverImage} alt="Book Cover" width={"150px"} />;
    };


    return (
        <div id="bookPageShow">
            <div className=" mt-5">
                <Breadcrumb title={book.title} />

                <div className="card">
                    <div className="row holder">
                        <div className="col-md-3">
                            {getCoverImage(book.coverImage)}
                        </div>
                        <div className="col-md-9">
                            <h5 className="card-header">
                                <span>Title : </span>
                                <span>{book.title} </span>
                            </h5>
                            <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-muted">
                                    Author: {book.author}
                                </h6>
                                <p className="card-des">
                                    <span>About the book</span>
                                    <span>{book.description}</span>
                                </p>
                                <p className="card-des">
                                    <span>Publication Date:</span>
                                    <span>
                                        {formatDate(book.publicationDate)}
                                    </span>
                                </p>
                                <div className="card-genre">
                                    <span>Genre</span>
                                    <span>{book.genre}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowBook;
