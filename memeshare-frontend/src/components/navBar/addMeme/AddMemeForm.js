import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

const AddMemeForm = ({ setShowModal, getMemes }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [msg, setMsg] = useState("");

  /**
   * create new meme
   */
  const onMemeSubmit = async (e) => {
    console.log("on Add meme");
    e.preventDefault();
    // get the data from the form
    let data = {};
    for (var i = 0; i < 3; i++) {
      data[`${e.target[i].name}`] = e.target[i].value;
    }
    // send post request
    await fetch(process.env.REACT_APP_URL + "/memes/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // if response is 201 then update component
      .then((response) => {
        if (response.status === 201) {
          console.log("created");
          setShowModal(false);
          getMemes();
        }
        // if response is 400 then show validation error
        else if (response.status === 400) return response.json();
        else throw response.status;
      })
      .then((e) => {
        // validation error
        if (e !== undefined) {
          setMsg(e.errors[0]);
          setShowModal(true);
          setShowMessage(true);
        }
      })
      // show error accoring to response
      .catch((error) => {
        console.log(error);
        if (error == 409) {
          setMsg("Content already exists");
        } else {
          setMsg("Network Error.. Please Try again");
        }
        setShowModal(true);
        setShowMessage(true);
      });
  };

  return (
    <div className="AddMemeForm">
      <Form onSubmit={onMemeSubmit}>
        <Alert variant="danger" show={showMessage ? "true" : ""}>
          {" "}
          {msg}
        </Alert>
        <Form.Group>
          <Form.Label>Your Name</Form.Label>
          <Form.Control type="text" name="name" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Meme Url</Form.Label>
          <Form.Control type="text" name="url" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Caption</Form.Label>
          <Form.Control as="textarea" name="caption" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save{" "}
        </Button>
      </Form>
    </div>
  );
};

export default AddMemeForm;
