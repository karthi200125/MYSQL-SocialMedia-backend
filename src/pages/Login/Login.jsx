import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authcontext";
import {FaEye,FaLock} from 'react-icons/fa'
import logo from '../../assets/crown.png'

const Login = () => {
  const [pass, setPass] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const {login} = useContext(AuthContext)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Username or password is incorrect";
      setErr(errorMessage);
    }
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
        <h2>Login</h2>
        <form className="form" >
          <div className="inputBox">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={inputs.username}
          onChange={handleChange}
          required
        />
            <FaLock size={20} className="icon-lock" />
          </div>
          

          <div className="inputBox"> 
       <input
          type="password"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
          required
        />
            <FaEye
              size={20}
              className="icon-eye"
              onClick={() => setPass(!pass)}
            />
          </div>
                      
          <div className="links" style={{ color: "black" }}>
            Don't you have an account?{" "}
            <Link to="/register" style={{ textDecoration: "none", color: "#5271ff" }}>
              Register
            </Link>
          </div>            
         {err && <p  className="error-message">{err}</p>}
          <div className="btn" onClick={handleLogin}>
            <a href="#">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <button type="submit">Login</button>
            </a>
          </div>
          
        </form>
      </div>
    </div>
  </section>
  );
};

export default Login;
