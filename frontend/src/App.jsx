import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/jsx/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostProject from './pages/PostProject';
import CompanyDashboard from './pages/CompanyDashboard';
import ProjectDetails from './pages/ProjectDetails';
import StudentDashboard from './pages/StudentDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post-project" element={<PostProject />} />
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
