import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './../Styles/Footer.css';
import Facebook from './../assets/Fb.png';
import Instagram from './../assets/Instagram.png';
import Linkedin from './../assets/linkedin.png';
function Footer() {
    return (
        <Container fluid className="Footer_Container">
            <Row>
                <Col className='First_col'>
                    <h5>Job Seekers</h5>
                    <ul>
                        <li><a href="/find-jobs">Search Jobs</a></li>
                        <li><a href="/blogs">Blogs</a></li>
                    </ul>
                </Col>

                <Col>
                    <h5>For Employers</h5>
                    <ul>
                        <li><a href="/post-jobs">Post Jobs</a></li>
                        <li><a href="/hiring">Hiring</a></li>
                        <li><a href="/requirement">Requirement services</a></li>
                    </ul>
                </Col>

                <Col>
                    <h5>About Us</h5>
                    <ul>
                        <li><a href="/our-story">FaceBook</a></li>
                        <li><a href="/team">Instagram</a></li>
                        <li>Connecting talent with opportunity</li>
                    </ul>
                </Col>

                {/* Column for Contact Us */}
                <Col className='LastCol'>
                    <h5>Contact Us</h5>
                    <ul>
                        <li>Babarmall, Baneswar</li>
                        <li>Kathmandu, Nepal</li>
                        <li>9746454403/</li>
                        <li>nepjobs@gmail.com</li>
                    </ul>
                </Col>
            </Row>
            <Row className='FooterEnd'>
                <Col className='Icons'>
                    <a href="https://www.facebook.com/"><img className='Facebook_Icon' src={Facebook} alt="fb" /></a>
                    <a href="https://www.Instagram.com/"><img className='Instagram_Icon' src={Instagram} alt="Insta" /></a>
                    <a href="https://www.Linkedin.com/"><img className='Linkendin_Icon' src={Linkedin} alt="Liknedin" /></a>
                </Col>
                <Col className="text-center">
                    <p className="mt-2 ms-0">© {new Date().getFullYear()} NepJobs. All rights reserved.</p>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;
