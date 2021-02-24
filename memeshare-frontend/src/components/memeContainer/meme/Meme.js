import { Card, Col, Row } from "react-bootstrap";
import MemeOptions from "./MemeOptions";
import "./Meme.css";

const Meme = ({ meme, getMemes }) => {
  const onEditMeme = (e) => {
    console.log(e);
  };
  return (
    <div className="Meme">
      <Card>
        <Card.Header>
          <Row>
            <Col>
              <Card.Title>{meme.name}</Card.Title>
            </Col>
            <Col>
              <MemeOptions meme={meme} getMemes={getMemes} />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Text>{meme.caption}</Card.Text>
        </Card.Body>
        <Card.Img src={meme.url} />
      </Card>
    </div>
  );
};

export default Meme;
