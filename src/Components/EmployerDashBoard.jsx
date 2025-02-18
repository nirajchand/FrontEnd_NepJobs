import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './../Styles/EmployerDashboard.css';
import logo from './../assets/logo.png';

function EmployerDashBoard() {
  return (
    <div className="EmployerDashboard">
      {/* Sidebar Navigation */}
      <div className="SideNavBar">
        <img className="logo" src={logo} alt="logo" />
        <nav>
          <ul>
            <li><Link className="navLink" to="">Add Job</Link></li>
            <li><Link className="navLink" to="jobs">Posted Jobs</Link></li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="mainContainer">
        <Outlet />  {/* This changes dynamically based on route */}
      </div>
    </div>
  );
}

export default EmployerDashBoard;
