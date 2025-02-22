import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import "./../Styles/Jobs.css";
import Card from "./Card.jsx";
import Star from "./../assets/star.png";
import { getEmployers } from "../Api/Api.js"; 

function ContainerExample() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getEmployers(); 
        console.log( "Returned by backend: ",response.data);
        setJobs(response.data); // Assuming API returns an array of job objects
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Container className="JobsContainer mt-5 ">
      <Row className="bg-white JobsBar">
        <img className="StarIcon" src={Star} alt="Star Icon" />
        Top Jobs
      </Row>
      <Row className="mt-1">
        {jobs.map((job) => (
          <Card key={job.job_id} job={job} /> // Pass job data to Card component
        ))}
      </Row>
    </Container>
  );
}

export default ContainerExample;
