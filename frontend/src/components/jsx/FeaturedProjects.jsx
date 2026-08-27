import React from 'react';
import '../css/FeaturedProjects.css';

const FeaturedProjects = () => {
  return (
    <section className="section" id="featured-projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <div className="grid grid-3">
          <div className="project-card">
            <div className="project-header">
              <span className="badge">Web Dev</span>
              <span className="status">Open</span>
            </div>
            <h3>E-commerce Frontend Refactor</h3>
            <p className="company-name">TechStart Inc.</p>
            <p className="project-desc">Looking for a React developer to modernize our product listing pages.</p>
            <button className="btn btn-primary w-full">View Details</button>
          </div>
          <div className="project-card">
            <div className="project-header">
              <span className="badge">Design</span>
              <span className="status">Open</span>
            </div>
            <h3>Brand Identity Redesign</h3>
            <p className="company-name">Creative Studio</p>
            <p className="project-desc">Need a fresh logo and brand guidelines for a new SaaS product.</p>
            <button className="btn btn-primary w-full">View Details</button>
          </div>
          <div className="project-card">
            <div className="project-header">
              <span className="badge">Data</span>
              <span className="status">Open</span>
            </div>
            <h3>Customer Data Analysis</h3>
            <p className="company-name">Growth Metrics</p>
            <p className="project-desc">Analyze Q3 user engagement data and present actionable insights.</p>
            <button className="btn btn-primary w-full">View Details</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;