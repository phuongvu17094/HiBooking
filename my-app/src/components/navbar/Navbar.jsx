import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.css";
import { faBell, faCircleQuestion, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import UserMenu from "../userMenu/userMenu";


const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [click, setClick] =  useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {dispatch} = useContext(AuthContext);

  const handleCLick = ()=>{
    setClick(!click)
  }

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout=()=>{
    dispatch({ type: "LOGOUT"})
    setClick(!click)
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <div className="Logo">
            <h2 className="logo_Text">HiBooking</h2>
            <FontAwesomeIcon icon={faPlaneDeparture} className="logoIcon" />
          </div>
        </Link>
        <div className="navItem">
          <div className="nItem">
            <span>VND</span>
          </div>
          <div className="nItem">
            <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"} className="country"/>
          </div>
          <div className="nItem">
          <FontAwesomeIcon icon={faCircleQuestion} className="logoIcon" />
          </div>
          <div className="nItem">
            <FontAwesomeIcon icon={faBell} className="logoIcon" />
            <div className="counter">1</div>
          </div>
          <div className="nItem">
            <span className="property">List your property</span>
          </div>
          {user ? (
          <div className="userContainer">
            <div className="user" onClick={handleToggleMenu}>
              <div className="avatar">
                {user.img ? <img src={user.img}/> : <img src={"https://i.ibb.co/MBtjqXQ/no-avatar.gif"}/>}
                {user.username}
              </div>
            </div>
            {isMenuOpen && <UserMenu handleLogout={handleLogout} />}
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton" >Login</button>
            </Link>
          </div>
        )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
