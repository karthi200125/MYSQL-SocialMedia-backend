import './Navbar.scss'
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaRegMoon } from 'react-icons/fa';
import {BsFillSunFill,BsFillMoonStarsFill} from 'react-icons/bs'
import { AiOutlineHome, AiOutlineBell, AiOutlineMail, AiOutlineUser, AiOutlineSearch } from 'react-icons/ai';
import { DarkModeContext } from "../../context/darkModeContext";
import {AuthContext} from '../../context/authcontext'
import logo from '../../assets/crown.png';
import {BsPersonCircle} from 'react-icons/bs'

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo">
            <img src={logo} alt="" />
            <span>FriendZone</span>
          </div>
        </Link>
      </div>
      <div className="right">
        <AiOutlineUser className="icon" />
        <AiOutlineMail className="icon" />
        <AiOutlineBell className="icon" />        
        {darkMode ? (
          <BsFillSunFill className="icon moon" onClick={toggle} size={25}/>
        ) : (
          <BsFillMoonStarsFill onClick={toggle} className="icon sun" size={25}/>
        )}        
          <Link style={{textDecoration:'none'}}className="username" to={`/profile/${currentUser.id}`}>
             <h1>{currentUser.username}</h1>
             {!currentUser.profilePic ? 
             <BsPersonCircle className='personicon'size={25}/>:
             <img src={"/upload/"+currentUser.profilePic} alt="" />
             }
          </Link>        
      </div>
    </div>
  );
};

export default Navbar;
