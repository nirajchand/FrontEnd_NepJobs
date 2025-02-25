import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Dropdown } from "react-bootstrap";
import "./../Styles/UserHome.css";
import { deleteApplication, getAppliedJobs } from "./../Api/Api.js";
import { BsThreeDotsVertical } from "react-icons/bs";

function UserHome() {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const userId = localStorage.getItem("userId");

        // Call API with userId
        const response = await getAppliedJobs(userId);
        console.log("Response from backend:", response.data);

        if (
          response &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          // Add applicationStatus field, defaulting to "Pending"
          const jobsWithStatus = response.data.map((job) => ({
            ...job,
            applicationStatus: job.applicationStatus || "Pending",
          }));
          setAppliedJobs(jobsWithStatus);
        } else {
          console.log("No applied jobs found or response is not an array.");
          setAppliedJobs([]);
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };
    fetchAppliedJobs();
  }, []);

  const handleDelete = async (applicationid) => {
    try {
      const deleteResponse = await deleteApplication(applicationid);
      alert(deleteResponse.data.message);
      setAppliedJobs((prevJobs) =>
        prevJobs.filter((job) => job.applicationid !== applicationid)
      );
    } catch (error) {
      console.error("Error deleting job application:", error);
    }
  };

  return (
    <Container className="d-inline-block">
      <Row>
        <Col className="UserJobsContainer mt-4 shadow">
          <h3>Applied Jobs</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Job Position</th>
                <th>Salary</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appliedJobs.length > 0 ? (
                appliedJobs.map((job) => (
                  <tr key={job.applicationid}>
                    <td>{job.Job.title}</td>
                    <td>${job.Job.salary}/month</td>
                    <td>{job.Job.applicationDeadline}</td>
                    <td
                      style={{
                        color:
                          job.applicationStatus === "Pending"
                            ? "blue"
                            : job.applicationStatus === "Approved"
                            ? "green"
                            : job.applicationStatus === "Rejected"
                            ? "red"
                            : "black", // Default color in case of other statuses
                      }}
                    >
                      {job.applicationStatus}
                    </td>
                    <td>
                      <Dropdown className="custom-dropdown">
                        <Dropdown.Toggle variant="light" className="icon-btn">
                          <BsThreeDotsVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => handleDelete(job.applicationid)}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No applied jobs found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default UserHome;
