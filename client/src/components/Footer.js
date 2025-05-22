import React from 'react';
import './styling/Footer.css';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <span>© Thomas Leavy, 2025</span>
        <nav className="footer-links">
          <a href="https://www.linkedin.com/in/thomasleavy/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/thomasleavy" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
