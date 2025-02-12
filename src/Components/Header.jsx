import "./../Styles/Header.css";
import {Container,Button} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Logo from "./../assets/logo.png";
import User from "./../assets/User_icon.png";
import Employer from './../assets/EmployZone.png';


function BasicExample() {
  return (
    <Navbar expand="lg" className="custom_navbar_color">
      <Container >
        <Navbar.Brand as={Link} to="/" className="text-danger">
          NepJobs
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" as={Link} to="/" className="ms-lg-5 text-white">
              Home
            </Nav.Link>
            <Nav.Link href="#link" className="ms-lg-5  text-white">
              Contact Us
            </Nav.Link>
              <Button as={Link} to="/login" className="Jobseeker_dropdown"> <img src={User} alt="UserIcon" className="UserIcon" />Login</Button>
              <Button as={Link} to="/register" className="EmployerDropdown"> <img src={Employer} alt="EmployerIcon" className="EmployerIcon" />Register</Button>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
