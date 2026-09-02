import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.accountType !== 'student') {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5001/api/student/applications/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setApplications(data.applications);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
        setLoading(false);
      });
  }, [user?.id, user?.accountType]);

  if (!user) {
    return (
      <div>
        <h2>Please login first.</h2>

        <button onClick={() => navigate('/login')}>
          Go to Login
        </button>
      </div>
    );
  }

  if (user.accountType !== 'student') {
    return (
      <div>
        <h2>Access Denied</h2>

        <p>This dashboard is only available to students.</p>

        <Link to="/">Go to Home</Link>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="student-dashboard">
      <div className="container">

        <h1>Welcome, {user.name}!</h1>

        <p>
          Track your project applications and opportunities.
        </p>

        <div className="dashboard-actions">

          <Link to="/" className="btn btn-primary">
            Browse Projects
          </Link>

          <button onClick={handleLogout} className="btn">
            Logout
          </button>

        </div>

        <hr />

        <h2>My Applications</h2>

        {loading ? (
          <p>Loading applications...</p>
        ) : applications.length === 0 ? (
          <p>You haven't applied to any projects yet.</p>
        ) : (
          <div className="applications-list">

            {applications.map((application) => (
              <div
                className="application-card"
                key={application.application_id}
              >

                <h3>{application.project_title}</h3>

                <p>
                  <strong>Company:</strong>{' '}
                  {application.company_name}
                </p>

                <p>
                  <strong>Category:</strong>{' '}
                  {application.category}
                </p>

                <p>
                  <strong>Status:</strong>{' '}
                  {application.status}
                </p>

                <p>
                  <strong>Applied on:</strong>{' '}
                  {new Date(
                    application.applied_at
                  ).toLocaleString()}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default StudentDashboard;