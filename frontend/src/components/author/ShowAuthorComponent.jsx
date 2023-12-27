import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ShowAuthor(props) {

    let { showViewAuthor, setShowViewAuthor, author } = props; ;
    let handleCloseViewAuthor = () => setShowViewAuthor(false);

    useEffect(() => {



    },[])
    


    return (
        <>

            <Modal show={showViewAuthor} onHide={handleCloseViewAuthor} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal {author.fistName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you are reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseViewAuthor}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ShowAuthor;
