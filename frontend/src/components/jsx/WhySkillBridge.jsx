import React from 'react';
import '../css/WhySkillBridge.css';

const WhySkillBridge = () => {
  return (
    <section className="section bg-light" id="why-skillbridge">
      <div className="container">
        <h2 className="section-title">Why SkillBridge?</h2>
        <div className="grid grid-3">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                <path d="M12 12v9"></path>
                <path d="m8 17 4 4 4-4"></path>
              </svg>
            </div>
            <h3>Real Experience</h3>
            <p>Work on actual projects that matter, not just sandbox tutorials.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>Direct Connections</h3>
            <p>Get noticed by top companies actively looking for talent.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <path d="m3 15 2 2 4-4"></path>
              </svg>
            </div>
            <h3>Build Portfolio</h3>
            <p>Showcase completed work and verified reviews on your profile.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySkillBridge;