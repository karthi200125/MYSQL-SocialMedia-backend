import "./leftBar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MessageIcon from '@mui/icons-material/Message';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
// import { Link as Scroll } from "react-scroll";

const LeftBar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">          
          <Link className="linkk"to="/">
          <div className="item">
            <HomeOutlinedIcon className="icon"/>
            <span>Home</span>
          </div>
          </Link>          
          <Link className="linkk"to="/search">
          <div className="item">
            <SearchOutlinedIcon className="icon"/>
            <span>Search</span>
          </div>
          </Link>
          <Link className="linkk"to="/">
          <div className="item">
            <PeopleAltIcon className="icon"/>
            <span>Friends</span>
          </div>
          </Link>
          
          <div className="item">
            <MessageIcon className="icon"/>
            <span>Message</span>
          </div>          
          <div className="item">
            <NotificationsOutlinedIcon className="icon"/>
            <span>Notification</span>
          </div>
          <Link className="linkk"to='/create'>
          <div className="item">
          <AddBoxIcon className="icon"/>
            <span>Create</span>
          </div>
          </Link>
          
          <Link className="username linkk"to={`/profile/${currentUser.id}`}>                    
          <div className="item">
            <AccountCircleIcon className="icon"/>
            <span>Profile</span>
          </div>
          </Link>          
          
          <div className="item">
            <MoreVertIcon className="icon"/>
            <span>More</span>
          </div>
        </div>
                              
      </div>
    </div>
  );
};

export default LeftBar;
