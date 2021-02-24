import { Alert, Container, Spinner } from "react-bootstrap";
import Footer from "./footer/Footer";
import MemeContainer from "./memeContainer/MemeContainer";
import NavBar from "./navBar/NavBar";
import "./MainContainer.css";

const MainContainer = ({ memes, getMemes, showLoading}) => {
  return (
    <div className="MainContainer">
      <Container>
        <NavBar getMemes={getMemes} />
        <div id="loading" hidden={showLoading?"":"true"}>
          <Spinner animation="border" variant="primary"/>
        </div>
        <MemeContainer memes={memes} getMemes={getMemes} />
        <Footer />
      </Container>
    </div>
  );
};
export default MainContainer;
