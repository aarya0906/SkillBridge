import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CompanyDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.accountType !== 'company') {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5001/api/company/applications/${user.id}`)
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

  // Check whether a user is logged in
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

  // Only companies can access this dashboard
  if (user.accountType !== 'company') {
    return (
      <div>
        <h2>Access Denied</h2>

        <p>This dashboard is only available to companies.</p>

        <Link to="/">Go to Home</Link>
      </div>
    );
  }
const handleStatusUpdate = async (applicationId, status) => {
  try {
    const response = await fetch(
      `http://localhost:5001/api/applications/${applicationId}/status`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: status
        })
      }
    );

    const data = await response.json();

    if (data.success) {
      alert(`Application ${status} successfully!`);

      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          application.application_id === applicationId
            ? { ...application, status: status }
            : application
        )
      );
    } else {
      alert(data.message || 'Failed to update application.');
    }
  } catch (error) {
    console.error('Error updating application:', error);
    alert('Unable to connect to the server.');
  }
};
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="company-dashboard">
      <div className="container">

        <h1>Welcome, {user.name}!</h1>

        <p>
          Manage your projects and connect with talented students.
        </p>

        <div className="dashboard-actions">

          <Link to="/post-project" className="btn btn-primary">
            Post a Project
          </Link>

          <button onClick={handleLogout} className="btn">
            Logout
          </button>

        </div>

        <hr />

        <h2>Project Applications</h2>

        {loading ? (
          <p>Loading applications...</p>
        ) : applications.length === 0 ? (
          <p>No applications received yet.</p>
        ) : (
          <div className="applications-list">

            {applications.map((application) => (
              <div
                className="application-card"
                key={application.application_id}
              >

                <h3>{application.project_title}</h3>

                <p>
                  <strong>Student:</strong>{' '}
                  {application.student_name}
                </p>

                <p>
                  <strong>Email:</strong>{' '}
                  {application.student_email}
                </p>

                <p>
                  <strong>Status:</strong>{' '}
                  {application.status}
                </p>

                <p>
                  <strong>Applied on:</strong>{' '}
                  {new Date(application.applied_at).toLocaleString()}
                </p>
                {application.status === 'pending' && (
  <div className="application-actions">

    <button
      className="btn btn-primary"
      onClick={() =>
        handleStatusUpdate(
          application.application_id,
          'accepted'
        )
      }
    >
      Accept
    </button>

    <button
      className="btn"
      onClick={() =>
        handleStatusUpdate(
          application.application_id,
          'rejected'
        )
      }
    >
      Reject
    </button>

  </div>
)}

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default CompanyDashboard;