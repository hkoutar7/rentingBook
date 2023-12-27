import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteAuthor, fetchAuthors } from "../../rtk/reducers/authorReducer";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import BreadCrumb from "./../../components/main/breadCrumb";
import authorManAvatar from "./../../assets/images/author/authorMan.png";
import authorWomanAvatar from "./../../assets/images/author/authorWoman.png";
import StoreAuthor from "../../components/author/StoreAuthorComponent";

import "./../../assets/styles/author/indexAuthor.css";
import ShowAuthor from "../../components/author/ShowAuthorComponent";

function IndexAuthor() {

    let dispatch = useDispatch();
    let authors = useSelector((state) => state.author.authors);
    let authorNumber = useSelector((state) => state.author.authorsNumber);

    const [showViewAuthor, setShowViewAuthor] = useState(false);
    const handleShowViewAuthor = () => setShowViewAuthor(true);



    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchAuthors());
            } catch (error) {
                console.log(`There's an issue in fetching authors: ${error}`);
            }
        };
        fetchData();
    }, [dispatch]);

    let getAvatar = (gender) => {
        if (gender === "male") 
            return <img src={authorManAvatar} alt="img is missing" style={{ width: "80px"}} />
        else 
            return <img src={authorWomanAvatar} alt="img is missing" style={{ width: "80px"}} />
    }

    let getBiographie = (biographie) => {

        return biographie.length > 56 ? `${String(biographie).slice(0,56)} ...` : biographie;
    }

    let handleDeleteAuthor = (idAuthor, fullNameAuthor ) => {
        Swal.fire({
            title: "Delete Author",
            text: `Are you sure you want to delete ${fullNameAuthor}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteAuthor( idAuthor ));
                Swal.fire({
                    title: "Deleted Successfully!",
                    text: `${fullNameAuthor} has been deleted successfully`,
                    icon: "success",
                });
            }
        });
    }



    return (
        <div id="authorPageIndex" className="mt-4">
            <BreadCrumb />

            <div className="title">
                <h4>Meet our <span>{authorNumber}</span> authors who have passionately crafted tales of adventure</h4>
                <p>Love, and wisdom, enriching your reading experience with their diverse views and unique perspectives.</p>
            </div>


            <div className="row" style={{ rowGap: "10px"}}>
                {authors !== undefined && Object.keys(authors).length > 0 &&
                    authors.map((author) => (
                        <div className="col-md-6" key={author._id}>
                            <article>
                                <div>{getAvatar(author.gender)}</div>
                                <div>
                                    <div>
                                        <h4>{author.firstName + " " + author.lastName}</h4>
                                        <p>{getBiographie(author.bio)}</p>
                                    </div>
                                    <div>
                                        <div>
                                        <span onClick={handleShowViewAuthor}  >See_more</span>
                                        <ShowAuthor author = {author._id} showViewAuthor= {showViewAuthor}  setShowViewAuthor ={setShowViewAuthor}  />
                                    </div>
                                    <div>
                                        <span>Follow</span>
                                    </div>
                                    </div>
                                </div>
                                <div className="operations">
                                    <div  ><FaPencilAlt /></div>
                                    <div onClick={() => handleDeleteAuthor(author._id, author.firstName + " " + author.lastName)}  ><FaTrashAlt /></div>
                                </div>
                            </article>
                        </div>
                    ))}
            </div>

            <StoreAuthor />

        </div>
    );

}

export default IndexAuthor
