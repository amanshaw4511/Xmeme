import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import EditMeme from "./editMeme/EditMeme";
import "./MemeOptions.css";

const MemeOptions = ({ meme, getMemes }) => {
  const [modalShow, setModalShow] = useState(false);

/**
 * send delete request
 */
  const onDelete = async (id) => {
    await fetch(process.env.REACT_APP_URL + "/memes/" + id, {
      method: "DELETE",
    })
    // if response is 205 then update components
    .then(response => {
      if (response.status !== 204) throw response.status; 
      console.log("deleted", id);
      getMemes();
    })
    // show error
    .catch(error => {
      console.log(error);
    });
  
  };

  return (
    <div className="MemeOptions">
      <Dropdown>
        <div id="editMemeButton">
          <Dropdown.Toggle variant="white">
            {/* 3 vertcal dots icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </Dropdown.Toggle>
        </div>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setModalShow(true)}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={() => onDelete(meme.id)}>
            Delete
          </Dropdown.Item>
          <Dropdown.Item>Report</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <EditMeme
        modalShow={modalShow}
        setModalShow={setModalShow}
        meme={meme}
        getMemes={getMemes}
      />
    </div>
  );
};

export default MemeOptions;
