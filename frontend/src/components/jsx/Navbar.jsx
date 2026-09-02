import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user'))
  );

  useEffect(() => {
    const checkUser = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };

    window.addEventListener('userLogin', checkUser);
    window.addEventListener('storage', checkUser);

    return () => {
      window.removeEventListener('userLogin', checkUser);
      window.removeEventListener('storage', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">

        <Link to="/" className="logo">
          <span className="logo-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--primary)' }}
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </span>
          SkillBridge
        </Link>

        <ul className="nav-links">

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/">About</Link>
          </li>

          <li>
            <Link to="/">Projects</Link>
          </li>

          <li>
            <Link to="/">How It Works</Link>
          </li>

          {user && user.accountType === 'student' && (
            <li>
              <Link to="/student-dashboard">
                My Applications
              </Link>
            </li>
          )}

          {user && user.accountType === 'company' && (
            <li>
              <Link to="/company-dashboard">
                Company Dashboard
              </Link>
            </li>
          )}

        </ul>

        <div className="nav-actions">

          {user && user.accountType === 'company' && (
            <Link
              to="/post-project"
              className="nav-post-project"
            >
              Post a Project
            </Link>
          )}

          {!user && (
            <>
              <Link
                to="/login"
                className="nav-login"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-primary"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <button
              className="nav-login"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;