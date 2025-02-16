import React from 'react'
import Header from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';
import {Outlet} from 'react-router-dom';
import './../Styles/Layout.css';

function layout() {
  return (
    <div className='App_layout'>
        <Header/>
        <div className='App_body'>
          <Outlet />
        </div>
        <Footer/>
    </div>
  )
}

export default layout
