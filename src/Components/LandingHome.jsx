import React from "react";
import "./../Styles/LandingHome.css";
import { Link } from "react-router-dom";

function LandingHome() {
  return (
    <>
      <div className="textContainer">
        <p className="middle-text">Empower Your Journey</p>
        <p className="middle-text">Explore Limitless</p>
        <p className="middle-text">Opportunities with Nepjobs</p>
        <Link to="/login">
          <button className="GetStartedbtn">Get Started</button>
        </Link>
      </div>
      <div className="main-container"></div>
    </>
  );
}

export default LandingHome;
