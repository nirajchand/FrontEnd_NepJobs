import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getJob, updateJob } from "../Api/Api";
import { useNavigate } from "react-router-dom";

function UpdateJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);


  console.log(jobId);
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    salary: "",
    applicationDeadline: "",
    jobLogo: "",
  });

  useEffect(() => {
    getJob(jobId)
      .then((response) => {
        const jobData = response.data; // Access the data field

        setJobDetails({
          title: jobData.title,
          description: jobData.description,
          skillsRequired: jobData.skillsRequired,
          salary: jobData.salary,
          applicationDeadline: jobData.applicationDeadline,
          jobLogo: jobData.jobLogo || profileImage,
        });

        console.log("Response is: ", response);
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
      });
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("title", jobDetails.title);
    formDataToSend.append("description", jobDetails.description);
    formDataToSend.append("skillsRequired", jobDetails.skillsRequired);
    formDataToSend.append("salary", jobDetails.salary);
    formDataToSend.append("applicationDeadline", jobDetails.applicationDeadline);
  
    if (jobDetails.jobLogo instanceof File) {
      formDataToSend.append("jobLogo", jobDetails.jobLogo); // Append only if it's a new file
    }
  
    try {
      const response = await updateJob(jobId, formDataToSend);
      alert(response.data.message);
      navigate("/Employer/jobs");
    } catch (error) {
      alert("Failed to update job.");
      console.error("Error updating job:", error);
    }
  };
  


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); 
      setPreviewImage(imageUrl); // Update preview
      setJobDetails((prevDetails) => ({
        ...prevDetails,
        jobLogo: file, 
      }));
    }
  };
  

  return (
    <Container className="add-job-container">
      <h2 className="text-center mb-4">Update Job</h2>
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
                src={previewImage || jobDetails.jobLogo}
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
                value={jobDetails.title}
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
                value={jobDetails.description}
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
                value={jobDetails.skillsRequired}
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
                value={jobDetails.salary}
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
                value={jobDetails.applicationDeadline}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="AddJobbtn w-50">
          Update Job
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateJob;
