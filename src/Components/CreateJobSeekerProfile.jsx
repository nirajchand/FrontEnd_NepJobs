import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {createJobSeekerProfile} from "../Api/Api"; // Import your Axios instance
import './../Styles/CreateJobSeekerProfile.css';
function CreateJobSeekerProfile() {
  const [formData, setFormData] = useState({
    profileImage: null,
    skills: "",
    desiredIndustry: "",
    location: "",
    experienceLevel: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData({ ...formData, profileImage: file });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append("userId", userId);
    formDataToSend.append("profileImage", formData.profileImage);
    formDataToSend.append("skills", formData.skills);
    formDataToSend.append("desiredIndustry", formData.desiredIndustry);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("experienceLevel", formData.experienceLevel);
  
    try {
      const response = await createJobSeekerProfile(formDataToSend);
      alert(response.data.message);
      navigate("/JobSeeker");
    } catch (error) {
      console.error("Error creating profile:", error);
      alert("Failed to create profile.");
    }
  };

  return (
    <Container className="UpdateContainer">
      <h2 className="text-center mb-4">Create Your Profile</h2>
      <Form onSubmit={handleSubmit}>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formProfileImage">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
              <Image
                src={previewImage || "https://via.placeholder.com/150"}
                rounded className="mt-2"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formSkills">
              <Form.Label>Skills</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Enter your skills"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formDesiredIndustry">
              <Form.Label>Desired Industry</Form.Label>
              <Form.Control as="select" name="desiredIndustry" value={formData.desiredIndustry} onChange={handleChange}>
                <option value="">Select desired industry</option>
                <option>Information Technology</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Education</option>
                <option>Manufacturing</option>
                <option>Retail</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your location"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formExperienceLevel">
              <Form.Label>Experience Level</Form.Label>
              <Form.Control as="select" name="experienceLevel" value={formData.experienceLevel} onChange={handleChange}>
                <option value="">Select experience level</option>
                <option>Entry Level</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="w-100">
          Create Profile
        </Button>
      </Form>
    </Container>
  );
}

export default CreateJobSeekerProfile;
