import React from 'react';
import '../css/Benefits.css';

const Benefits = () => {
  return (
    <section className="section bg-light" id="benefits">
      <div className="container">
        <h2 className="section-title">Mutual Benefits</h2>
        <div className="grid grid-2">
          <div className="benefit-box student-benefit">
            <h3>For Students</h3>
            <ul>
              <li><span className="check-icon">✓</span> Gain practical, hands-on experience</li>
              <li><span className="check-icon">✓</span> Earn money while learning</li>
              <li><span className="check-icon">✓</span> Build a professional network</li>
              <li><span className="check-icon">✓</span> Transition directly into full-time roles</li>
            </ul>
          </div>
          <div className="benefit-box company-benefit">
            <h3>For Companies</h3>
            <ul>
              <li><span className="check-icon">✓</span> Access fresh, motivated talent</li>
              <li><span className="check-icon">✓</span> Get projects done efficiently</li>
              <li><span className="check-icon">✓</span> Evaluate candidates on real work</li>
              <li><span className="check-icon">✓</span> Reduce hiring risk and costs</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;