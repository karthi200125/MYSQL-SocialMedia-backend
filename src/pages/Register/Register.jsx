import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import axios from "axios";
import logo from '../../assets/crown.png'
import {FaEye,FaLock,FaEnvelope} from 'react-icons/fa'


const Register = () => {
  const [pass, setPass] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate=useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate('/login')  
    } catch (err) {
      setErr(err.response.data);
    }
    console.log(inputs)

  };



  return (
    <section>
      <div className="grid">
        {Array.from({ length: 112 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>
      <div className="signin">
        <div className="content">
          <img src={logo} alt="" />
          <h2>Register</h2>
          <form className="form" >
            <div className="inputBox">
              <input
                required
                type="text"
                placeholder="username"
                name="username"
                onChange={handleChange}
              />
              <FaLock size={20} className="icon-lock" />
            </div>

            <div className="inputBox">
              <input
                required
                type="email"
                placeholder="email"
                name="email"
                onChange={handleChange}
              />
              <FaEnvelope size={20} className="icon-lock" />
            </div>

            <div className="inputBox">
              <input
                type={pass ? "text" : "password"}
                required
                placeholder="password"
                name="password"
                onChange={handleChange}
              />
              <FaEye
                size={20}
                className="icon-eye"
                onClick={() => setPass(!pass)}
              />
            </div>
            <input required style={{ display: "none" }} type="file" id="file" />
            
            <div className="links" style={{ color: "black" }}>
              Do you have an account?{" "}
              <Link to="/login" style={{ textDecoration: "none", color: "#5271ff" }}>
                Login
              </Link>
            </div>                        
            {err && <p className="error-message" style={{color : 'red'}}>{err}</p>}            
            <div className="btn">
              <a href="#">
                {/* <span></span>
                <span></span>
                <span></span>
                <span></span>                 */}
                <button type="submit"onClick={handleClick}>Sign Up</button>
              </a>
            </div>
            
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
