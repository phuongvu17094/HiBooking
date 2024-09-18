import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";

const Login = () => {
  const { user, loading, error, dispatch } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "https://mern-booking-web.onrender.com/api/auth/login",
        //"http://localhost:8800/api/auth/login",
        credentials,
        {
          withCredentials: true,
        }
      );
      if(res.data.isAdmin){
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
      }
      else{
        dispatch({ type: "LOGIN_FAILED", payload: {message: "You are not admin!"} });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILED", payload: err.response.data });
    }
  };

  console.log(user);
  return (
    <div className="login">
      <div className="loginContainer">
        <input
          type="text"
          className="loginInput"
          onChange={handleChange}
          placeholder="username"
          id="username"
        />
        <input
          type="text"
          className="loginInput"
          onChange={handleChange}
          placeholder="password"
          id="password"
        />
        <button disabled={loading} onClick={handleClick} className="loginBtn">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
