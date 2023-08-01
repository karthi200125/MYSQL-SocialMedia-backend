import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import logo from '../../assets/crown.png'
import User from '../../components/User/User'

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo">
          <img src={logo} alt="" />
          <span >FriendZone</span>
          </div>
          
        </Link>                                
      </div>
      <div className="right">        
        <PersonOutlinedIcon className="icon"/>
        <EmailOutlinedIcon className="icon"/>
        <NotificationsOutlinedIcon className="icon"/>
      {darkMode ? (
          <WbSunnyOutlinedIcon className="icon"onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} className="icon"/>
        )}


        {/* make side bar import here and then make function like if itis 
        desktop its not shown.its only shows when its mobile screen */}
        {/* <GridViewOutlinedIcon className="icon gird"/> */}
        <div className="user">          

          <Link className="username"to={`/profile/${currentUser.id}`}>                    
          <User className='use'/>
          </Link>          
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
