import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.css';

const Footer = () => {

  return (
    <div className="signature-container">
      <div className="signature-content">
        <span> Nate Lumpkin
          <a href="https://www.linkedin.com/in/nate-lumpkin-a6180a16/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
          <a href="https://github.com/natelumpkin" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-square-github"></i></a>
        </span>
      </div>
    </div>
  )
}

export default Footer;
