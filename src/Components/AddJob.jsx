import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import "./../Styles/AddJob.css"; // Import specific styling for AddJob
import { postJob } from "../Api/Api";

function AddJob() {
  const [formData, setFormData] = useState({
    title: "",
    jobLogo: null,
    description: "",
    skillsRequired: "",
    salary: "",
    applicationDeadline: "",
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData({ ...formData, jobLogo: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    if (
      !formData.jobLogo ||
      !formData.title ||
      !formData.description ||
      !formData.skillsRequired ||
      !formData.salary ||
      !formData.applicationDeadline
    ) {
      alert("Please fill in all required fields.");
      return;
    }
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("employer_id", userId);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("jobLogo", formData.jobLogo);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("skillsRequired", formData.skillsRequired);
      formDataToSend.append("salary", formData.salary);
      formDataToSend.append("applicationDeadline", formData.applicationDeadline);
  
      const response = await postJob(formDataToSend);
      console.log(response);
      alert(response.data.message);
      setFormData({
        title: "",
        jobLogo: "",
        description: "",
        skillsRequired: "",
        salary: "",
        applicationDeadline: "",
      });
      setPreviewImage(null); // Reset image preview after successful form submission
    } catch (error) {
      alert("Job not posted. Try again.");
    }
  };
  
  return (
    <Container className="add-job-container">
      <h2 className="text-center mb-4">Add New Job</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formJobLogo">
              <Form.Label>Company Logo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Image
                src={previewImage }
                rounded
                className="mt-2"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formJobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter job title"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Description"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formSkillsRequired">
              <Form.Label>Skills Required</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="skillsRequired"
                value={formData.skillsRequired}
                onChange={handleChange}
                placeholder="Enter required skills"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formSalary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Enter salary"
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formDeadline">
              <Form.Label>Application Deadline</Form.Label>
              <Form.Control
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="AddJobbtn w-50">
          Add Job
        </Button>
      </Form>
    </Container>
  );
}

export default AddJob;
