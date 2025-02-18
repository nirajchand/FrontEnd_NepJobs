import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap';
import './../Styles/UpdateJobseekerProfile.css';

function UpdateJobSeekerProfile() {
  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <Container className='UpdateContainer'>
      <h2 className="text-center mb-4">Update Your Profile</h2>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formProfileImage">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
              {selectedImage ? (
                <Image src={selectedImage} rounded className="mt-2" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
              ) : (
                <Image src="https://via.placeholder.com/150" rounded className="mt-2" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formSkills">
              <Form.Label>Skills</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your skills" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formDesiredIndustry">
              <Form.Label>Desired Industry</Form.Label>
              <Form.Control as="select">
                <option>Select desired industry</option>
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
              <Form.Control type="text" placeholder="Enter your location" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formExperienceLevel">
              <Form.Label>Experience Level</Form.Label>
              <Form.Control as="select">
                <option>Select experience level</option>
                <option>Entry Level</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="w-100">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateJobSeekerProfile;