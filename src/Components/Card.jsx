import React from "react";
import { Link } from "react-router-dom";
import "./../Styles/Card.css";

function Card({ job }) {
  return (
    <div className="card mb-3 CardContainer">
      <Link to={`/Jobseeker/jobDetails/${job.job_id}`}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`http://localhost:5000${job.jobLogo}`}
              className=" rounded-start cardImage"
              alt="Company Logo"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{job.title}</h5>
              <p className="card-text"> Deadline: {job.applicationDeadline}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;
