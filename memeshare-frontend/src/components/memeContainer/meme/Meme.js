import {useState, useEffect} from "react";
import {Card, Col, Row} from "react-bootstrap";
import MemeOptions from "./MemeOptions";
import "./Meme.css";

const AsyncImage = ({src}) => {
  const [loadedSrc, setLoadedSrc] = useState(null);

  useEffect(() => {
    setLoadedSrc(null);
    if (src) {
      const handleLoad = () => {
        setLoadedSrc(src);
      };
      const image = new Image();
      image.addEventListener('load', handleLoad);
      image.src = src;
      return () => {
        image.removeEventListener('load', handleLoad);
      };
    };
  }, [src]);

  if (loadedSrc === src) {
    return (
      <img src={src} />
    );
  }
  return null;
}

const Meme = ({meme, getMemes}) => {

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
        {/* <Card.Img src={meme.url} />*/}
        <AsyncImage src={meme.url} />
      </Card>
    </div>
  );
};

export default Meme;
