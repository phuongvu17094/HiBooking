import "./register.css";
import { useContext, useState } from "react";
import axios from "axios"
import Navbar from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/authContext";
import {useNavigate} from "react-router-dom"

const Register = ({inputs}) => {
    const navigate = useNavigate()
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({})
  const [success, setSuccess] = useState(false);
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const handleChange = (e) =>{
    setInfo((prev)=>({...prev, [e.target.id]: e.target.value}))
  }

  const handleClick = async (e)=>{
    
      e.preventDefault();
      const data = new FormData();
      data.append("file", file ? file : "https://i.ibb.co/MBtjqXQ/no-avatar.gif") 
      
      data.append("upload_preset", "upload")
      
      try{
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dmjouaoml/image/upload", data)
        
        //console.log(uploadRes.data);
        const {url} = uploadRes.data;

        const newUser = {
          ...info,
          img: url
        }

        await axios.post("https://mern-booking-web.onrender.com/api/auth/register", newUser, {withCredentials: true});
        dispatch({ type: "LOGIN_START" });
  
      const res = await axios.post(
        "https://mern-booking-web.onrender.com/api/auth/login",
        newUser
      )
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      setSuccess(true)
      }catch(err){
        console.log(err); 
    }
  }
  console.log(info)

  return (
    <div className="new">
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Register</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <FontAwesomeIcon icon={faFolderPlus} />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} onChange={handleChange} id={input.id}/>
                </div>
              ))}
             
              <button onClick={handleClick}>Send</button>
              {success && navigate("/")}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
