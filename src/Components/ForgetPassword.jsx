import React, { useState } from "react";
import { Link } from "react-router-dom";
import API, { forgetPassword } from "./../Api/Api.js";
import "./../Styles/ForgotSection.css";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await forgetPassword (formData) ;
      setMessage(response.data.message);
    } catch (error) {
      console.error("Forgot Password Error:", error.response?.data || error);
      setMessage(
        error.response?.data?.error ||
          "Server error. Check console for details."
      );
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Enter your new password"
            required
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your new password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="reset-button">
          Reset Password
        </button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="message">
        <p>
          Remembered your password?{" "}
          <Link className="login-text" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
