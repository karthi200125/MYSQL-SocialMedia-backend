import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext"; // Only import the context, not the login function
import "./login.scss";
import logo from '../../assets/crown.png';
import { MdOutlineArrowRightAlt } from 'react-icons/md';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const authContext = useContext(AuthContext); 

  const handleclick = async (e) => {
    e.preventDefault();
    try {
      await authContext.login(inputs);
      navigate("/");
    } catch (err) {      
      const errorMessage = err.response.data?.message || "Username Or password Wrong";
      setErr(errorMessage);
    }
  };

  return (
    <div className="login">
      <div className='box'>
        <div className="logo">
          <img src={logo} alt="" />
          <h1>Login</h1>
          </div>
          <form className='form'>
        <input type="text" placeholder="Username" name="username" onChange={handleChange} required />
        <input type="password" placeholder="Password" name="password" onChange={handleChange} required />
        {err && <p style={{ color: 'red' }}>{err}</p>}
        <div className='btn'onClick={handleclick}>
                <button type="submit">Login</button>
                <MdOutlineArrowRightAlt className='icon-btn'/>
        </div>
      </form>
      <div className='bottom'>
        <span>Don't have an account?</span>
        <Link className='link' to="/register">Register</Link>
      </div>
    </div>
  </div>
  );
};

export default Login;
