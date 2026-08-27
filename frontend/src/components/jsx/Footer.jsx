import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo text-white">SkillBridge</div>
            <p>Empowering the next generation of talent.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 SkillBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;