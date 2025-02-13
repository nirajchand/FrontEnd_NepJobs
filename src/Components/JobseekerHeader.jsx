import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Logo from "./../assets/logo.png";
import Home from './../assets/Home.png';
import Profile from './../assets/Profile.png';
import './../Styles/JobSeekerHeader.css';

function JobseekerHeader() {
  return (
    <Navbar expand="lg" className="custom_navbar_color">
      <Container>
        <Navbar.Brand as={Link} to="/JobSeeker/jobseekerHome" className="text-danger">
          NepJobs
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  as={Link} to="/JobSeeker/jobseekerHome" className="ms-lg-5 mt-3 text-white">
              Home
            </Nav.Link>
            <Nav.Link href="#link" className="ms-lg-5 mt-3 text-white">
              Contact Us
            </Nav.Link>
            <Nav.Link as={Link} to="/JobSeeker" className="OverView mt-2 text-white">
                <img src={Home} alt="home" className="p-2 " />
              OverView
            </Nav.Link>
            <Nav.Link as={Link} to="/JobSeeker/profile" className="ms-lg-5 mt-2 text-white">
                <img src={Profile} alt="home" className="p-2" />
              My Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default JobseekerHeader;
