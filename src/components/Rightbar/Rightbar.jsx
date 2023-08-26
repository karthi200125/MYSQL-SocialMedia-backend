import { useContext, useEffect, useState } from "react";
import "./Rightbar.scss";
import {AuthContext} from '../../context/authcontext'
import axios from "axios";
import {BsPersonCircle} from 'react-icons/bs'

const Rightbar = () => {
  const [followed, setFollowed] = useState([]);
  const [unfollowed, setunFollowed] = useState([]);
  const [btn,setbtn]=useState(false)
  
  const { currentUser, token } = useContext(AuthContext);
  
  const headers = {
    Authorization: `Bearer ${token}`, 
    "X-User-ID": currentUser.id.toString(),
  };
  
  useEffect(() => {
    const fetchFollowedUsers = async () => {
      try {
        const res=await axios.get('http://localhost:8800/api/rightbar/followed',{headers});
        setFollowed(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFollowedUsers();
  }, []);

  useEffect(() => {
    const fetchunFollowedUsers = async () => {
      try {
        const res=await axios.get('http://localhost:8800/api/rightbar/unfollowed',{headers});
        setunFollowed(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchunFollowedUsers();
  }, []);


  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>You Followed</span>                     
          {followed && followed === 0 ? <p>Search and Make New Frinds</p>
          :followed.map((user) => (
            <div className="user" key={user.id}>
              <div className="userInfo">
                <img src={"/upload/" + user.profilePic} alt="" />
                <span>{user.username}</span>
              </div>            
            </div>
          ))}
        </div>
        <div className="item">
          <span>Make friends</span>
          {unfollowed.map((un) => (
            <div className="user" key={un.id}>
              <div className="userInfo">
                {!un.profilePic ? 
                <BsPersonCircle className='personicon'size={30}/>
                :<img src={"/upload/" + un.profilePic} alt="" />
                 }                
                <span>{un.username}</span>
              </div>
              <div className="buttons">              
                <button>Follow</button>                          
              </div>
            </div>
          ))}
        </div>        
      </div>
    </div>
  );
};

export default Rightbar;
