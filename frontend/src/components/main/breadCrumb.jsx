import Breadcrumb from "react-bootstrap/Breadcrumb";

import  "./../../assets/styles/main/breadCrumb.css";
import { useNavigate } from "react-router-dom";


function BreadcrumbExample() {

    let navigate = useNavigate();
    let handleClick = () => {
        navigate("/ourAuthors");
    }

    return (
        <Breadcrumb id="breadCrumb">
            <Breadcrumb.Item onClick={() => handleClick()} >Our Author</Breadcrumb.Item>
            <Breadcrumb.Item active>authors</Breadcrumb.Item>
        </Breadcrumb>
    );
}

export default BreadcrumbExample;
