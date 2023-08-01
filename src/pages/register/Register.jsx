import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import logo from '../../assets/crown.png'
import {MdOutlineArrowRightAlt} from 'react-icons/md'


const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);
  

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://socialserver-tovf.onrender.com/api/auth/register", inputs);
      
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err)

  return (
    <div className="register">
      <div className="box">
        <div className="logo">
          <img src={logo} alt="" />
          <h1>Register</h1>
        </div>                  
          <form className='form'>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              required
            />            
            {err && <p style={{color : 'red'}}>{err}</p>}            
        <div className='btn'onClick={handleClick}>
                <button>Register</button>
                <MdOutlineArrowRightAlt className='icon-btn'/>
        </div>
          </form>
       <div className="bottom">
            
            <span>Do you have an account?</span>
        <Link className='link'to="/login">Login</Link>
       </div>
        </div>
      </div>    
  );
};

export default Register;
