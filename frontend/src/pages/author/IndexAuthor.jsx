import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAuthors } from "../../rtk/reducers/authorReducer";
import BreadCrumb from "./../../components/main/breadCrumb";
import authorManAvatar from "./../../assets/images/author/authorMan.png";
import authorWomanAvatar from "./../../assets/images/author/authorWoman.png";

import "./../../assets/styles/author/indexAuthor.css";

function IndexAuthor() {

    let dispatch = useDispatch();
    let authors = useSelector((state) => state.author.authors.data);
    
    useEffect(() => {
        try {
            dispatch(fetchAuthors());
        } catch (error) {
            console.log(`there s an issue in fetching authors ${error}`);
        }
    }, []);

    let getAvatar = (gender) => {
        if (gender === "male") 
            return <img src={authorManAvatar} alt="img is missing" style={{ width: "80px"}} />
        else 
            return <img src={authorWomanAvatar} alt="img is missing" style={{ width: "80px"}} />
    }

    let getBiographie = (biographie) => {

        return biographie.length > 56 ? `${String(biographie).slice(0,56)} ...` : biographie;
    }

    console.log(authors);

    return (
        <div id="authorPageIndex" className="mt-4">
            <BreadCrumb />
            <div className="row" style={{ rowGap: "10px"}}>
                {authors !== undefined && Object.keys(authors).length > 0 &&
                    authors.map((author) => (
                        <div className="col-md-6" key={author._id}>
                            <article>
                                <div>{getAvatar("male")}</div>
                                <div>
                                    <div>
                                        <h4>{author.firstName + " " + author.lastName}</h4>
                                        <p>{getBiographie(author.bio)}</p>
                                    </div>
                                    <div>
                                        <div>
                                        <span>See_more</span>
                                    </div>
                                    <div>
                                        <span>Follow</span>
                                    </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default IndexAuthor
