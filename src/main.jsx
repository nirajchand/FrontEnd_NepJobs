import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Search from './Components/SearchBar.jsx';
import Layout from './Pages/layout.jsx';
import Jobs from './Components/Jobs.jsx';
import Login from './Components/Login.jsx';
import Register from './Components/Register.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobSeekerLayout from './Pages/JobSeekerLayout.jsx';
import UserHome from './Components/UserHome.jsx';
import JobSeekerDetails from './Components/JobSeekerProfile.jsx';
import JobSeekerUpdate from './Components/UpdateJobSeekerProfile.jsx';
import CreateJobSeekerProfile from './Components/CreateJobSeekerProfile.jsx';
import EmployerDashBoard from './Components/EmployerDashBoard.jsx';
import AddJob from './Components/AddJob.jsx';
import PostJob from './Components/PostJob.jsx';
import JobDetails from './Components/JobDetails.jsx';
import LandingHome from './Components/LandingHome.jsx';
import ContactPage from './Components/ContactPage.jsx';
import UpdateJob from './Components/UpdateJob.jsx';
import JobApplication from './Components/ApplicationForJob.jsx';
import InnerContactPage  from './Components/InnerContactPage.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element = {<Layout/>}>
        <Route index element={<><LandingHome /><ContactPage /></>} />    
        <Route path = 'login' element = {<Login/>}/>
        <Route path = 'register' element = {<Register/>}/>
      </Route>

      < Route path = '/JobSeeker' element={ <JobSeekerLayout/>}>
        <Route path='' element={<UserHome/>}></Route>
        <Route path='jobseekerHome' element={<Jobs/>}></Route>
        <Route path = 'profile' element = {<JobSeekerDetails/>}> </Route>
        <Route path = 'createProfile' element = {<CreateJobSeekerProfile/>}> </Route>
        <Route path = 'update' element = {<JobSeekerUpdate/>}> </Route>
        <Route path='jobDetails/:jobId' element = {<JobDetails/>}></Route>
        <Route path='contact-us' element = {<InnerContactPage/>}></Route>
      </Route>

      <Route path='/Employer' element = {<EmployerDashBoard/>}>
        <Route path='' element = {<AddJob/>}></Route>
        <Route path='jobs' element = {<PostJob/>}></Route>
        <Route path='UpdateJob/:jobId' element = {<UpdateJob/>}></Route>
        <Route path='Applications/:jobId' element = {<JobApplication/>}></Route>
      </Route>

    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
