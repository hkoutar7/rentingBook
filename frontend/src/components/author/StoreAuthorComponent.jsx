import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import { addAuthor } from "../../rtk/reducers/authorReducer";
import { useDispatch } from "react-redux";

function StoreAuthor() {
    const [show, setShow] = useState(false);
    const [formValid, setFormValid] = useState(false); 

    const handleClose = () => {
        setShow(false);
        setFormValid(false);
    };

    const handleShow = () => setShow(true);

    let dispatch = useDispatch();

    const [authorInfo, setAuthorInfo] = useState({
        firstName: "",
        lastName: "",
        occupation: "",
        nationality: "",
        gender: "",
        bio: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuthorInfo((prevInfo) => ({ ...prevInfo, [name]: value }));

        setFormValid(validateForm());
    };

    const validateForm = () => {
        return Object.values(authorInfo).every((value) => value !== "");
    };

    const handleSaveChanges = () => {
        dispatch(addAuthor(authorInfo));
        handleClose();
        setAuthorInfo({
            firstName: "",
            lastName: "",
            occupation: "",
            nationality: "",
            gender: "",
            bio: "",
        });
    };

    return (
        <>
            <div className="authorAdd" onClick={handleShow}>
                <FaPlus />
            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add a new author</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="formAuthorNameFirst">
                                        <Form.Label>
                                            Author firstname :
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="enter author firstname"
                                            name="firstName"
                                            value={authorInfo.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="formAuthorNameLast">
                                        <Form.Label>
                                            Author lastname :
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="enter author lastname"
                                            name="lastName"
                                            required
                                            value={authorInfo.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="formOccupation">
                                        <Form.Label>Occupation</Form.Label>
                                        <Form.Select
                                            aria-label="Select author occupation"
                                            name="occupation"
                                            value={authorInfo.occupation}
                                            onChange={handleInputChange}
                                        >
                                            <option value="" disabled>
                                                Select occupation
                                            </option>
                                            <option value="novelist">
                                                Novelist
                                            </option>
                                            <option value="writer">
                                                Writer
                                            </option>
                                            <option value="poet">Poet</option>
                                            <option value="Screenwriter">
                                                Screenwriter
                                            </option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="formAuthorNationality">
                                        <Form.Label>Nationality :</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter author nationality"
                                            name="nationality"
                                            value={authorInfo.nationality}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group controlId="formGender">
                                <Form.Label>Gender</Form.Label>
                                <Row>
                                    <Col xs={12} md={3}>
                                        <Form.Check
                                            type="radio"
                                            label="Male"
                                            name="gender"
                                            value="male"
                                            onChange={handleInputChange}
                                            checked={
                                                authorInfo.gender === "male"
                                            }
                                        />
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Check
                                            type="radio"
                                            label="Female"
                                            name="gender"
                                            value="female"
                                            onChange={handleInputChange}
                                            checked={
                                                authorInfo.gender === "female"
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group controlId="formBio">
                                <Form.Label>biographie</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter author's bio"
                                    name="bio"
                                    value={authorInfo.bio}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSaveChanges}
                        disabled={!formValid}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default StoreAuthor;
