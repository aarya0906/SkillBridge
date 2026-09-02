import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      setMessage(data.message);

      if (data.success) {
        console.log('Logged in user:', data.user);

        // Store user information
        localStorage.setItem('user', JSON.stringify(data.user));
        window.dispatchEvent(new Event('userLogin'));

        // Redirect according to account type
        if (data.user.accountType === 'company') {
          navigate('/company-dashboard');
        } else {
          navigate('/');
        }
      }

    } catch (error) {
      console.error(error);
      setMessage('Unable to connect to the backend.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <h2>Welcome Back</h2>

        <p className="auth-subtitle">
          Login to your SkillBridge account
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-options">

            <label className="checkbox-label">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#" className="forgot-password">
              Forgot Password?
            </a>

          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Login
          </button>

        </form>

        {message && (
          <p className="auth-subtitle">
            {message}
          </p>
        )}

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register">
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;