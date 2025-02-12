import React from 'react'
import JobSeekerHeader from '../Components/JobseekerHeader.jsx';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer.jsx';
import './../Styles/JobSeekerLayout.css';

function JobSeekerLayout() {
  return (
    <div className='JobSeekerHeaderContainer'>
      <JobSeekerHeader/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default JobSeekerLayout
