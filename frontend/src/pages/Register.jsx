import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [accountType, setAccountType] = useState('student');

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Create an Account</h2>
        <p className="auth-subtitle">Join SkillBridge today</p>
        
        <div className="account-type-toggle">
          <button 
            className={`toggle-btn ${accountType === 'student' ? 'active' : ''}`} 
            onClick={() => setAccountType('student')}
          >Student</button>
          <button 
            className={`toggle-btn ${accountType === 'company' ? 'active' : ''}`} 
            onClick={() => setAccountType('company')}
          >Company</button>
        </div>

        <form className="auth-form">
          <div className="form-group">
            <label>Full Name {accountType === 'company' && '/ Company Name'}</label>
            <input type="text" placeholder="Enter name" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create password" />
          </div>
          <button type="submit" className="btn btn-primary w-full">Register</button>
        </form>
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;