import React from 'react';
import { Link } from 'react-router-dom';
import './userMenu.css'; // Tệp CSS cho style

const UserMenu = ({ handleLogout }) => {
  return (
    <div className="user-menu">
      <Link to="/my-rooms" className="user-menu-item">
        Manage Account
      </Link>
      <div className="user-menu-item"> Your rooms</div>
      <div className="user-menu-item"> Genius loyalty program</div>
      <div className="user-menu-item">Rewards & Wallet</div>
      <div className="user-menu-item"> Reviews</div>
      <div className="user-menu-item"> Saved</div>
      <div className="user-menu-item" onClick={handleLogout}>
        Sign out
      </div>
    </div>
  );
};

export default UserMenu;