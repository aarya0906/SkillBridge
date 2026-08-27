import React from 'react';
import '../css/Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>Real Projects.<br/><span className="text-secondary">Real Skills.</span><br/>Real Opportunities.</h1>
          <p>Connect with top companies, build real-world projects, and showcase your skills to land your dream job.</p>
          <div className="hero-actions">
            <button className="btn btn-primary">Find Projects</button>
            <button className="btn btn-outline">Post a Project</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="dashboard-mockup">
            <div className="mockup-header"></div>
            <div className="mockup-body">
              <div className="mockup-sidebar"></div>
              <div className="mockup-content">
                <div className="mockup-cards">
                  <div className="mockup-card"></div>
                  <div className="mockup-card"></div>
                  <div className="mockup-card"></div>
                </div>
                <div className="mockup-chart"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;