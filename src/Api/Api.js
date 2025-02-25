
import axios from 'axios';

// Set up base URL
const API = axios.create({
    baseURL: 'http://localhost:5000', // Change this to your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach token to headers (if available)
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Authentication APIs
export const login = (userData) => API.post('/login', userData);
export const register = (userData) => API.post('/register', userData);
export const getUserData = (userId) =>  API.get(`/getUser/${userId}`)

// // Job Seeker APIs
export const getJobSeekerProfile = (Id) => API.get(`/JobSeeker/getProfile/${Id}`);
export const createJobSeekerProfile = (profileData) =>
    API.post("/JobSeeker/CreateProfile", profileData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
export const updateJobSeekerProfile = (userId,updatedData) => API.put(`JobSeeker/updateProfile/${userId}`,updatedData,{
    headers: {"Content-Type":"multipart/form-data"},
})

// Employer APIs
export const getEmployers = () => API.get('/Employer/getJobs');
export const getJob = (jobId) => API.get(`/Employer/getJob/${jobId}`)
export const getJobByEmployer = (EmployerId) => API.get(`/Employer//getEmployerJob/${EmployerId}`)
export const postJob = (jobData) => API.post('/Employer/postJob', jobData,{
    headers: {"Content-Type":"multipart/form-data"},
});
export const deleteJob = (jobId) => API.delete(`/Employer/deleteEmployerJob/${jobId}`)
export const updateJob = (jobId,jobDetails) => API.put(`/Employer/updateEmployerJob/${jobId}`,jobDetails,{
    headers: {"Content-Type":"multipart/form-data"},
});

//Application APIs
export const applyForJob = (jobData) => API.post('/Application/appliedJobs',jobData)
export const getAppliedJobs = (user_id) => API.get(`/Application/getAppliedJobs/${user_id}`);
export const getAppliedJobsForJobs = (jobId) => API.get(`/Application/getApplications/${jobId}`);
export const deleteApplication  = (application_id) => API.delete(`/Application/deleteApplication/${application_id}`)
export const updateApplication  = (application_id,status) => API.put(`/Application/updateStatus/${application_id}`,status)
// Export API instance for custom requests
export default API;
