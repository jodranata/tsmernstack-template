import React from 'react';
import Icon from '../images/favicon.png';

import '../css/Section.css';

const Section = () => {
  return (
    <div className="app-section">
      <p className="hero-title">A react template</p>
      <img src={Icon} alt="Profile" className="app-icon" />
      <p className="hero-text">By Jodi Pranata</p>
    </div>
  );
};

export default Section;
