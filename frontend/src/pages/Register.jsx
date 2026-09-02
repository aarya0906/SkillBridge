import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [accountType, setAccountType] = useState('student');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          accountType: accountType
        })
      });

      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setMessage('Unable to connect to the backend.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Create an Account</h2>
        <p className="auth-subtitle">Join SkillBridge today</p>

        <div className="account-type-toggle">
          <button
            type="button"
            className={`toggle-btn ${accountType === 'student' ? 'active' : ''}`}
            onClick={() => setAccountType('student')}
          >
            Student
          </button>

          <button
            type="button"
            className={`toggle-btn ${accountType === 'company' ? 'active' : ''}`}
            onClick={() => setAccountType('company')}
          >
            Company
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Full Name {accountType === 'company' && '/ Company Name'}
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>

        {message && (
          <p className="auth-subtitle">{message}</p>
        )}

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;