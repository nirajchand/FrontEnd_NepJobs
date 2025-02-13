import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row, Button } from "react-bootstrap";
import "./../Styles/JobSeekerProfile.css";
import { Link } from "react-router-dom";
import { getJobSeekerProfile, getUserData } from "../Api/Api"; // Import API function
import ProfilePlaceholder from "./../assets/ProfileImage.jpg";

export default function JobSeekerProfile() {
  const [profile, setProfile] = useState(null);
  const [profile2, setProfile2] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUserId = Number(localStorage.getItem("userId"));
        console.log("Fetched userId from localStorage:", storedUserId);

        if (!storedUserId) {
          console.error("User ID not found in localStorage");
          return;
        }
        const response = await getJobSeekerProfile(storedUserId);
        const response2 = await getUserData(storedUserId);
        setProfile(response.data);
        setProfile2(response2.data);
      } catch (error) {
        console.error("Error fetching job seeker profile:", error.response?.data || error.message);
      }
    };

    fetchProfile();
  }, [[localStorage.getItem("userId")]]);

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <Container className="profile-container">
      <Row>
        <Col>
          <Image
            className="roundedProfileImage"
            src={profile.profileImage}
            alt="Profile"
          />
        </Col>
        <Col>
          <h3>
            {profile2.fName} {profile2.lName}
          </h3>
          <p className="profile-info">Phone: {profile2.number}</p>
          <p className="profile-info">Email: {profile2.email}</p>
          <p className="profile-info">Gender: {profile2.gender}</p>
          <p className="profile-info">Location: {profile.location}</p>
        </Col>
        <Col>
          <Button className="updateBtn" as={Link} to="/JobSeeker/update">
            Update
          </Button>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h4 className="ms-3">Info</h4>
        </Col>
        <Col className="infoCol">
          <p className="infoData">
            Desired Industry: {profile.desiredIndustry}
          </p>
          <p className="infoData">
            Experience level: {profile.experienceLevel}
          </p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h4 className="ms-3">Skills</h4>
        </Col>
        <Col className="skillsInfo">
          {profile.skills ? profile.skills : "Not provided"}
        </Col>
      </Row>
    </Container>
  );
}
