import React from "react";
import { Modal } from "react-bootstrap";
import EditMemeForm from "./EditMemeForm";

const EditMeme = ({ modalShow, setModalShow, meme, getMemes }) => {
  return (
    <div className="EditMeme">
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Meme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditMemeForm
            meme={meme}
            setModalShow={setModalShow}
            getMemes={getMemes}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditMeme;
