import React from 'react';
import './Header.css';
import me from '../../../assets/me.jpg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  const handleAvatarClick = () => {
    navigate('/profile');
  };

  return (
    <div className="navbar">
      <h2 className="navbar-title">
        <span className="colored-letter">C</span>
        <span className="colored-letter">r</span>
        <span className="colored-letter">u</span>
        <span className="colored-letter">D</span>
        <span>-</span>
        <span className="colored-letter">a</span>
        <span className="colored-letter">p</span>
        <span className="colored-letter">P</span>
      </h2>
      <div className="user-info">
        {/* <span className="user-name">John Doe</span> */}
        <img onClick={handleAvatarClick} className="user-avatar1" src={me} alt="User Avatar" /> 
      </div>
    </div>
  );
};

export default Header;
