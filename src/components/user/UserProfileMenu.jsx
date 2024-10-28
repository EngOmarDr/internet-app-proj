// UserProfileMenu.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaCog, FaBell, FaSignOutAlt } from 'react-icons/fa';
import './UserProfileMenu.css';

const UserProfileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-profile-menu') && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    navigate('/login');
  };

  return (
    <div className="user-profile-menu">
      <FaUserCircle className="profile-icon" onClick={toggleMenu} />
      {menuOpen && (
        <div className="dropdown-menu">
          <Link to="/account-settings" className="menu-item">
            <FaCog className="menu-icon" /> Account Settings 
          </Link>
          <Link to="/notifications" className="menu-item">
            <FaBell className="menu-icon" /> Notifications 
          </Link>
          <div onClick={handleLogout} className="menu-item logout">
            <FaSignOutAlt className="menu-icon" /> Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileMenu;
