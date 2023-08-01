import React, { useState } from 'react';
import './User.css'
import { AuthContext } from '../../context/authContext';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const ProfileCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      alert("logout")
    } catch (err) {
      console.log(err)
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8800/logout', null, { withCredentials: true });
    } catch (error) {
      console.log(error);      
    }
  };


  return (
    <div
      className="profile-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={"/upload/"+ currentUser.profilePic}alt=""/>
      {isHovered && (
        <div className="card-content">
          <h3>{currentUser.name}</h3>
          <button className="logout-button"onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
