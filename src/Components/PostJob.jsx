import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getJobByEmployer, deleteJob } from '../Api/Api'; // Adjust the path if necessary
import './../Styles/PostJob.css';
import { Link } from "react-router-dom";

function PostJob() {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs by EmployerId when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {

        const EmployerId = localStorage.getItem("userId")
        const response = await getJobByEmployer(EmployerId);
        setJobs(response.data); // Set the job data
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []); // Runs when EmployerId changes

  // Handle the deletion of a job
  const handleDelete = async (jobId) => {
    try {
      await deleteJob(jobId); // Call the deleteJob API
      // Remove the deleted job from the UI
      setJobs((prevJobs) => prevJobs.filter((job) => job.job_id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <Container className="d-inline-block">
      <Row>
        <Col className="UserJobsContainer mt-4 shadow">
          <h3>Posted Jobs</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Job Position</th>
                <th>Salary</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.job_id}>
                  <td>{job.title}</td>
                  <td>${job.salary}/month</td>
                  <td>{job.applicationDeadline}</td>
                  <td>
                    <Dropdown className="dropdown">
                      <Dropdown.Toggle variant="light" className="icon-btn">
                        <BsThreeDotsVertical />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleDelete(job.job_id)}>
                          Delete
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to={`/Employer/UpdateJob/${job.job_id}`}>Update</Dropdown.Item>
                        <Dropdown.Item as={Link} to={`/Employer/Applications/${job.job_id}`}>Applications</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default PostJob;
