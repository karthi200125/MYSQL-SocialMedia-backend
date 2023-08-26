import React, { useContext, useEffect, useState } from 'react';
import './Search.scss';
import axios from "axios";
import { AiOutlineSearch } from 'react-icons/ai';
import { AuthContext } from '../../context/authcontext';
import { Link } from 'react-router-dom';
import {BsPersonCircle} from 'react-icons/bs'

const Search = () => {
  const [allusers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [query, setQuery] = useState("");

  const {currentUser}=useContext(AuthContext)
  

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/searchusers/allusers');
        setAllUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllUsers();
  }, []);

  useEffect(() => {
    const filtered = allusers.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [query, allusers]);

  

  return (
    <div className="searchs">
      <div className="search-box">
        <AiOutlineSearch className="icon" />
        <input
          type="text"
          placeholder="Search by username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="search-users">
        {filteredUsers.map((user) => (
          <Link style={{textDecoration:'none'}}className="username" to={`/profile/${user.id}`}>
          <div className="suser" key={user.id}>
            <div className="suserInfo">
              {!user.profilePic ?
              <BsPersonCircle className='personicon'size={40}/>
              :<img src={"/upload/"+user.profilePic} alt="" />
            }
              <span>{user.username}</span>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
