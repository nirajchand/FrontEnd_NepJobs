import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Badge,Button  } from "react-bootstrap";
import { getAppliedJobsForJobs } from "../Api/Api";
import { useParams } from "react-router-dom";
import './../Styles/ApplicationForJob.css';

const ApplicationForJob = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { jobId } = useParams();

  useEffect(() => {
    getAppliedJobsForJobs(jobId)
      .then((response) => {
        setApplications(response.data.applications); // Set the applications data in state
        setLoading(false); // Set loading to false once the data is fetched
      })
      .catch((err) => {
        setError("Error fetching applications");
        setLoading(false); // Set loading to false if there is an error
      });
  }, [jobId]); // This effect runs whenever the jobId changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>{error}</div>; // Show error message if any
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4 text-primary">Job Applications</h2>
      <Row>
        {applications.map((application) => (
          <Col md={6} lg={4} key={application.applicationid} className="mb-4">
            <Card className="shadow-sm p-3 job-card">
              <Card.Body>
              <img
                  src={`http://localhost:5000${application.usertable.JobSeeker.profileImage}`}
                  alt={`${application.usertable.fname}'s profile`}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
                <h4 className="text-dark">
                  {application.usertable.fname} {application.usertable.lname}
                </h4>
                <p className="text-muted">{application.usertable.JobSeeker.location}</p>
                <Badge bg="info">{application.usertable.JobSeeker.experienceLevel}</Badge>
                <div className="mt-3">
                  <strong>Skills:</strong>
                  <div className="mt-2">
                    <Badge bg="secondary" className="me-1">
                      {application.usertable.JobSeeker.skills}
                    </Badge>
                  </div>
                </div>
                <p className="mt-3">
                  <strong>Gender:</strong> {application.usertable.gender}
                </p>
                <Button className="Approvebtn">
                    Approve
                </Button>
                <Button className="Rejectbtn"> 
                    Reject
                </Button>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ApplicationForJob;
