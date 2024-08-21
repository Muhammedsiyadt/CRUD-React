import React, { useEffect } from 'react';
import Header from '../Header/Header';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import API from '../../../../config/AxiosConfig';

const Home = () => {
  const navigate = useNavigate()

  

  return (
    <>
      <Header />
      <div className="home-container">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome to the CRUD Application</h1>
        <p className="welcome-text">
          Manage your data with ease. This application allows you to create, read, update, and delete records efficiently.
        </p>
        {/* <div className="action-buttons">
          <button onClick={() => {navigate('/edit')}} className="action-button">Get Started</button>
          <button className="action-button">Learn More</button>
        </div> */}
      </div>
      </div>
    </>
  );
};

export default Home;
