import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import API from '../../../../config/AxiosConfig';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  useEffect(() => {
    console.log("hiiiiiiii")
    const userData = async () => {
      try {
        const token = await localStorage.getItem('usertoken')
        const res = await API.get('/user/userHome/userData', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.userData);
      } catch (error) {
        if(axios.isAxiosError(error)){
            console.log("erorr",error)
            if(error.response.status==403){
              console.log("successes")
              localStorage.removeItem("usertoken")
              navigate("/ln") 
      
            }
           console.log(error.response.status,"ooo")
        }
      }
    }
    userData()
  },[])

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="welcome-section">
          {         
            user.image ?    
            <img src={user.image} alt="User Profile" /> :
            <>
              <img src="path/to/placeholder-image.jpg" alt="Default Profile" />
              <p className="profile-prompt">
                You haven't set a profile image yet. <span onClick={() => navigate('/profile')} className="profile-link">Add your profile</span>.
              </p>
            </>
          }
          
          <h1 className="welcome-title">Welcome to the CRUD Application</h1>
          <p className="welcome-text">
            Manage your data with ease. This application allows you to create, read, update, and delete records efficiently.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
