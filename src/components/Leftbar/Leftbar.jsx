import './Leftbar.scss';
import { AiFillHome, AiFillMessage, AiOutlineSearch, AiOutlineLogout } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { MdAddBox, MdAccountCircle } from 'react-icons/md';
import { CiCircleMore } from 'react-icons/ci';
import { AuthContext } from '../../context/authcontext';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const Leftbar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8800/api/auth/logout', null, { withCredentials: true });
      navigate('/login');
      alert('Logged out');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <Link className="linkk" to="/">
            <div className="item">
              <AiFillHome className="icon" />
              <span>Home</span>
            </div>
          </Link>
          <Link className="linkk" to="/search">
            <div className="item">
              <AiOutlineSearch className="icon" />
              <span>Search</span>
            </div>
          </Link>
          <Link className="linkk" to="/">
            <div className="item">
              <BsFillPeopleFill className="icon" />
              <span>Friends</span>
            </div>
          </Link>
          <div className="item">
            <AiFillMessage className="icon" />
            <span>Message</span>
          </div>
          <Link className="linkk" to="/create">
            <div className="item">
              <MdAddBox className="icon" />
              <span>Create</span>
            </div>
          </Link>
          {/* Replace 'user_id_here' with the appropriate user ID */}
          <Link className="username linkk" to={`/profile/${currentUser.id}`}>
            <div className="item">
              <MdAccountCircle className="icon" />
              <span>Profile</span>
            </div>
          </Link>
          <div className="item"onClick={handleLogout}>
            <AiOutlineLogout className="icon" />
            <span>Logout</span>
          </div>
          <div className="item" >
            <CiCircleMore className="icon" />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
