import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

const EditMemeForm = ({ meme, setModalShow, getMemes }) => {
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState("");

  /**
   * send update request
   */
  const onEditMeme = async (e) => {
    console.log("on edit meme");
    e.preventDefault();
    // get data in json object from form
    let data = {};
    for (var i = 1; i < 3; i++) {
      data[`${e.target[i].name}`] = e.target[i].value;
    }
    // send update request
    await fetch(process.env.REACT_APP_URL + "/memes/" + meme.id, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // if response is ok then update componenets
      .then((response) => {
        if (response.ok) {
          console.log("edited");
          setModalShow(false);
          getMemes();
        } 
        // if 400 then show validation error
        else if (response.status === 400) return response.json();
        else throw response.status;
      })
      .then( e => {
        if (e !== undefined) {
          setMsg(e.errors[0]);
          setModalShow(true);
          setShowMsg(true);
        }
      })
      // open modal and show error
      .catch((e) => {
        console.log(e);
        setMsg("Network error.. Please try again");
        setShowMsg(true);
        setModalShow(true);
      });
  };

  return (
    <div className="EditMemeForm">
      <Form onSubmit={onEditMeme}>
        <Alert variant="danger" show={showMsg ? "true" : ""}>
          {msg}
        </Alert>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" disabled value={meme.name} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Meme Url</Form.Label>
          <Form.Control type="url" name="url" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Caption</Form.Label>
          <Form.Control as="textarea" name="caption" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default EditMemeForm;
