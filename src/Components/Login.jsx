import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./../Api/Api.js";
import "./../Styles/Login.css";
import {
  FloatingLabel,
  Container,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";

function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();

    if (!loginFormData.email || !loginFormData.password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await login(loginFormData);
      const { token, userId, requiresProfileCompletion, userType, message } =
        response.data;

      if (!token || !userId) {
        alert("Login failed. Please try again.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      alert(message);

      console.log(response.data);

      if (userType === "Job seeker") {
        // Redirect based on profile completion
        if (requiresProfileCompletion) {
          navigate("/JobSeeker/createProfile");
        } else {
          navigate("/JobSeeker/jobseekerHome");
        }
      }else{
        navigate("/Employer")
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password.");
    }
  };

  return (
    <Container className="LoginContainer">
      <Row className="LoginCard shadow-lg">
        <Col className="LoginImagecontainer"></Col>
        <Col className="LoginForm">
          <h2 className="mt-5">Welcome To NepJobs</h2>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-4 mt-5"
          >
            <Form.Control
              type="email"
              name="email"
              value={loginFormData.email}
              onChange={handleChange}
              placeholder="abc123@gmail.com"
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-1"
          >
            <Form.Control
              type="password"
              name="password"
              value={loginFormData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </FloatingLabel>
          {error && <p className="text-danger">{error}</p>}
          <p className="mb-5">Forget password ?</p>
          <Button
            variant="primary"
            size="lg"
            className="w-100"
            onClick={onLogin}
          >
            Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
