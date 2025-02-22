import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJob, applyForJob } from "../Api/Api";
import "./../Styles/JobDetails.css";
import { Table } from "react-bootstrap";

function JobDetails() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJob(jobId); // Call API
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);
  const handleApply = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const jobData = { job_id: Number(jobId), user_id: Number(userId)};
      console.log("Hello fucker", jobData); 
  
      const response = await applyForJob(jobData); 
      setApplied(true); 
      alert(response.data.message);
    } catch (error) {
      console.error("Error applying for the job:", error);
    }
  };

  if (loading) return <p>Loading job details...</p>;
  if (!job) return <p>Job not found</p>;

  return (
    <div className="mainContainer">
      <div className="inlineContainer">
        <img className="companyLogo" src={job.jobLogo} alt="Company Logo" />
        <div className="textContainer">
          <h3>Find the</h3>
          <h3>job that fits</h3>
          <h3>your life...</h3>
        </div>
      </div>

      <h4 className="mt-5 ms-3">Description</h4>
      <hr className="mt-0" />
      <p className="ms-3">{job.description}</p>

      <h4 className="ms-3">Basic Job Information</h4>
      <Table className="customTable" bordered hover>
        <tbody>
          <tr>
            <td>Job Title</td>
            <td>:</td>
            <td>{job.title}</td>
          </tr>
          <tr>
            <td>Salary</td>
            <td>:</td>
            <td>${job.salary.toLocaleString()} / month</td>
          </tr>
          <tr>
            <td>Skills Required</td>
            <td>:</td>
            <td>{job.skillsRequired}</td>
          </tr>
          <tr>
            <td>Application Deadline</td>
            <td>:</td>
            <td>{job.applicationDeadline}</td>
          </tr>
          <tr>
            <td>Posted On</td>
            <td>:</td>
            <td>{new Date(job.createdAt).toDateString()}</td>
          </tr>
        </tbody>
      </Table>

      {/* Disable the button if already applied */}
      <button 
        className="applyBtn" 
        onClick={handleApply} 
        disabled={applied}
      >
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobDetails;
