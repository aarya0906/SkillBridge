import React from 'react';
import '../css/HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="section bg-light" id="how-it-works">
      <div className="container">
        <h2 className="section-title">How SkillBridge Works</h2>
        <div className="grid grid-3">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Company Posts</h3>
            <p>Companies list real-world projects they need help with.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Student Applies</h3>
            <p>Students apply with their portfolio and pitch.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Project Completed</h3>
            <p>Get selected, do the work, and get reviewed.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;