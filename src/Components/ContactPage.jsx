import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "./../Styles/ContactPage.css";
import womanImage from "./../assets/login_image.jpg";

function ContactPage() {
  return (
    <Container
      fluid
      className="contact-section d-flex justify-content-center align-items-center"
      id="contact-section"
    >
      <Card className="contact-card shadow-lg">
        <Row className="align-items-center">
          {/* Left Side - Image */}
          <Col md={6} className="image-container">
            <img
              src={womanImage}
              alt="Woman with Laptop"
              className="contact-image"
            />
          </Col>

          {/* Right Side - Contact Form */}
          <Col md={6} className="form-container">
            <h2 className="contact-title">Contact Us</h2>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="firstName">
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      className="input-field"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="lastName">
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      className="input-field"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="emailId" className="mt-3">
                <Form.Control
                  type="text"
                  placeholder="Email"
                  className="input-field"
                />
              </Form.Group>
              <Form.Group controlId="message" className="mt-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Leave us a few words ✍️"
                  className="input-field"
                />
              </Form.Group>
              <Button variant="danger" className="submit-btn mt-3">
                SUBMIT
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default ContactPage;
