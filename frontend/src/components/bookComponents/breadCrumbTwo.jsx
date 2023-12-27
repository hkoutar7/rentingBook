import Breadcrumb from "react-bootstrap/Breadcrumb";

import "./../../assets/styles/main/breadCrumb.css";
import { useNavigate } from "react-router-dom";

function BreadcrumbExample({title}) {
    let navigate = useNavigate();
    let handleClick = () => {
        navigate(-1);
    };

    return (
        <Breadcrumb id="breadCrumb">
            <Breadcrumb.Item onClick={() => handleClick()}>
                Our Books
            </Breadcrumb.Item>
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
        </Breadcrumb>
    );
}

export default BreadcrumbExample;
