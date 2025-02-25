import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { register } from "../Api/Api";
import "./../Styles/Register.css";

function JobSeekerRegister() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    gender: "Male",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
    usertype: "Job seeker",
  });

  // Update state when user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (
      !formData.fname ||
      !formData.lname ||
      !formData.usertype ||
      !formData.number ||
      !formData.email
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await register(formData);
      console.log(response);
      alert(response.data.message);
      setFormData({
        fName: "",
        lName: "",
        gender: "Male",
        email: "",
        number: "",
        password: "",
        usertype: "Job seeker",
      });
    } catch (error) {
      if (error.response) {
        alert(
          error.response.data.message || "Something went wrong. Please try again."
        );
      } else if (error.request) {
        alert("No response from the server. Please try again.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Container className="JobSeekerRegisterContainer shadow-lg">
      <Row className="mt-3">
        <h4>Register</h4>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row className="mt-4">
          <Col>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Form.Group className="mt-3">
          <Form.Label>Gender</Form.Label>
          {["Male", "Female", "Others"].map((gender) => (
            <Form.Check
              inline
              label={gender}
              name="gender"
              type="radio"
              value={gender}
              checked={formData.gender === gender}
              onChange={handleChange}
              key={gender}
            />
          ))}
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mt-3">
          <Form.Label>User Type</Form.Label>
          <Form.Select
            name="usertype"
            value={formData.usertype}
            onChange={handleChange}
          >
            <option>Job seeker</option>
            <option>Employer</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4">
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default JobSeekerRegister;
