import Breadcrumb from "react-bootstrap/Breadcrumb";

import "./../../assets/styles/main/breadCrumb.css";
import { useNavigate } from "react-router-dom";

function BreadcrumbExample() {
    let navigate = useNavigate();
    let handleClick = () => {
        navigate("/ourBooks");
    };

    return (
        <Breadcrumb id="breadCrumb">
            <Breadcrumb.Item onClick={() => handleClick()}>
                Our Books
            </Breadcrumb.Item>
            <Breadcrumb.Item active>books</Breadcrumb.Item>
        </Breadcrumb>
    );
}

export default BreadcrumbExample;
