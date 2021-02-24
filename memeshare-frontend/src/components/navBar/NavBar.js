import { Nav, Navbar } from "react-bootstrap";
import AddMeme from "./addMeme/AddMeme";

const NavBar = ({ getMemes }) => {
  return (
    <div
      className="NavBar"
      style={{ backgroundColor: "rgb(248, 248, 248)", borderRadius: "10px" }}
    >
      <Navbar expand="lg">
        <Navbar.Brand href="/">
          <img src="/meme.png" height="50px" />
          Share
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              href="https://memeshare-backend.herokuapp.com/swagger-ui/"
              target="_blank"
            >
              Swagger
            </Nav.Link>
            <Nav.Link href="https://github.com/amanshaw4511" target="_blank">
              GitHub
            </Nav.Link>
            <Nav.Link
              href="https://linkedin.com/in/amanshaw4511"
              target="_blank"
            >
              LinkedIn
            </Nav.Link>
          </Nav>
          <AddMeme getMemes={getMemes} />
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
