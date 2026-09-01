import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* Dashboard Header */}
      <section className="dashboard-hero">
        <div>
          <p className="welcome-text">Welcome back, User! 👋</p>

          <h1>
            Your <span>SkillBridge</span> Dashboard
          </h1>

          <p className="hero-description">
            Manage your projects, discover opportunities and showcase
            your skills — all from one place.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Explore Projects →
            </button>

            <button className="secondary-btn">
              Update Profile
            </button>
          </div>
        </div>

        <div className="hero-illustration">
          <div className="floating-icon icon-one">💡</div>
          <div className="floating-icon icon-two">🚀</div>
          <div className="floating-icon icon-three">⭐</div>

          <div className="hero-circle">
            <span>🎓</span>
          </div>
        </div>
      </section>


      {/* Statistics */}
      <section className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon project-icon">📁</div>

          <div className="stat-info">
            <p>Projects</p>
            <h2>12</h2>
            <span className="positive">↗ 20% this month</span>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon application-icon">📨</div>

          <div className="stat-info">
            <p>Applications</p>
            <h2>5</h2>
            <span className="positive">↗ 2 new applications</span>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon skill-icon">⚡</div>

          <div className="stat-info">
            <p>Skills</p>
            <h2>8</h2>
            <span className="neutral">Keep learning!</span>
          </div>
        </div>


        <div className="stat-card">
          <div className="stat-icon profile-icon">👤</div>

          <div className="stat-info">
            <p>Profile</p>
            <h2>80%</h2>
            <span className="warning">Complete your profile</span>
          </div>
        </div>

      </section>


      {/* Main Dashboard Grid */}
      <section className="dashboard-grid">

        {/* Quick Actions */}
        <div className="dashboard-card quick-actions">

          <div className="card-header">
            <div>
              <p className="small-heading">GET STARTED</p>
              <h2>Quick Actions</h2>
            </div>

            <span className="header-icon">⚡</span>
          </div>


          <div className="action-list">

            <div className="action-item">
              <div className="action-icon">🔎</div>

              <div className="action-content">
                <h3>Find Projects</h3>
                <p>
                  Discover projects that match your skills.
                </p>

                <button className="text-btn">
                  View Projects →
                </button>
              </div>
            </div>


            <div className="action-item">
              <div className="action-icon">👤</div>

              <div className="action-content">
                <h3>Update Profile</h3>
                <p>
                  Keep your skills and information up to date.
                </p>

                <button className="text-btn">
                  Edit Profile →
                </button>
              </div>
            </div>


            <div className="action-item">
              <div className="action-icon">📋</div>

              <div className="action-content">
                <h3>My Applications</h3>
                <p>
                  Track the projects you have applied for.
                </p>

                <button className="text-btn">
                  View Applications →
                </button>
              </div>
            </div>

          </div>
        </div>


        {/* Profile Progress */}
        <div className="dashboard-card profile-card">

          <div className="card-header">
            <div>
              <p className="small-heading">YOUR PROFILE</p>
              <h2>Profile Strength</h2>
            </div>

            <span className="profile-percentage">80%</span>
          </div>


          <div className="profile-circle">
            <div className="circle-inner">
              <strong>80%</strong>
              <span>Complete</span>
            </div>
          </div>


          <p className="profile-message">
            You're almost there! Complete your profile to stand out
            and increase your chances of getting selected.
          </p>

          <button className="primary-btn full-btn">
            Complete Profile →
          </button>

        </div>

      </section>


      {/* Bottom Section */}
      <section className="bottom-grid">

        {/* Recent Projects */}
        <div className="dashboard-card recent-projects">

          <div className="card-header">
            <div>
              <p className="small-heading">YOUR ACTIVITY</p>
              <h2>Recent Projects</h2>
            </div>

            <button className="outline-btn">
              View All
            </button>
          </div>


          <div className="project-list">

            <div className="project-row">

              <div className="project-logo">🌐</div>

              <div className="project-details">
                <h3>Website Development</h3>
                <p>Frontend Development</p>
              </div>

              <span className="status active-status">
                Active
              </span>

              <button className="view-btn">
                View
              </button>

            </div>


            <div className="project-row">

              <div className="project-logo">📱</div>

              <div className="project-details">
                <h3>Mobile App Design</h3>
                <p>UI/UX Design</p>
              </div>

              <span className="status completed-status">
                Completed
              </span>

              <button className="view-btn">
                View
              </button>

            </div>


            <div className="project-row">

              <div className="project-logo">💼</div>

              <div className="project-details">
                <h3>Business Website</h3>
                <p>Web Development</p>
              </div>

              <span className="status active-status">
                Active
              </span>

              <button className="view-btn">
                View
              </button>

            </div>

          </div>

        </div>


        {/* Skills */}
        <div className="dashboard-card skills-card">

          <div className="card-header">
            <div>
              <p className="small-heading">YOUR EXPERTISE</p>
              <h2>Top Skills</h2>
            </div>

            <button className="outline-btn">
              Manage
            </button>
          </div>


          <div className="skill-item">

            <div className="skill-top">
              <span>React</span>
              <strong>90%</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: "90%" }}
              ></div>
            </div>

          </div>


          <div className="skill-item">

            <div className="skill-top">
              <span>JavaScript</span>
              <strong>85%</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: "85%" }}
              ></div>
            </div>

          </div>


          <div className="skill-item">

            <div className="skill-top">
              <span>UI / UX Design</span>
              <strong>75%</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: "75%" }}
              ></div>
            </div>

          </div>


          <div className="skill-item">

            <div className="skill-top">
              <span>Figma</span>
              <strong>70%</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: "70%" }}
              ></div>
            </div>

          </div>

        </div>

      </section>


      {/* Footer */}
      <footer className="dashboard-footer">
        <p>
          © 2026 SkillBridge. Connecting skills with opportunities.
        </p>
      </footer>

    </div>
  );
}

export default Dashboard;