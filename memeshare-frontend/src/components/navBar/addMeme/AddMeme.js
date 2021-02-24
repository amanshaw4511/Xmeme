import React from "react";
import { Button, Modal } from "react-bootstrap";
import AddMemeForm from "./AddMemeForm";
import './AddMeme.css'

const AddMeme = ({ getMemes }) => {
  const [showModal, setShowModal] = React.useState(false);
  
  return (
    <div className="AddMeme">
      <div id="addMemeButton">
        <Button varient="primary" onClick={()=>setShowModal(true)} style={{borderRadius:"15px"}}>
          Create Meme
        </Button>
      </div>

      <Modal
        show={showModal}
        onHide={()=>setShowModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Meme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMemeForm setShowModal={setShowModal} getMemes={getMemes} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddMeme;
