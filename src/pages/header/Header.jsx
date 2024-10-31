import { Link } from 'react-router-dom'; // استيراد Link
import './Header.css';
import { FaBell, FaSearch, FaBars } from 'react-icons/fa';
import { useState } from 'react';
import UserProfileMenu from '../user/UserProfileMenu';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // حالة القائمة

  const toggleMenu = () => setMenuOpen(!menuOpen); // دالة لتبديل حالة القائمة

  return (
    <header className="header">
      <div className="header-logo">
        <h1>FileManager</h1>
      </div>
      <nav className="header-nav">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/groups" className="nav-link">Groups</Link>
        {/* <Link to="/files" className="nav-link">Files</Link> */}
        <Link to="/reports" className="nav-link">Reports</Link>
        <Link to="/backup" className="nav-link">Backup & Restore</Link>
      </nav>
      <div className="header-actions">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
        <Link to="/notifications" className="nav-link">
          <FaBell className="icon notification-icon" title="Notifications" />
        </Link>
        <UserProfileMenu/>
        <FaBars className="menu-toggle" onClick={toggleMenu} /> {/* زر القائمة للموبايل */}
      </div>

      {/* قائمة منسدلة للروابط للموبايل */}
      {menuOpen && (
        <div className="mobile-menu show">
          <Link to="/dashboard" className="nav-link-mobile" onClick={toggleMenu}>Dashboard</Link>
          <Link to="/groups" className="nav-link-mobile" onClick={toggleMenu}>Groups</Link>
          <Link to="/files" className="nav-link-mobile" onClick={toggleMenu}>Files</Link>
          <Link to="/reports" className="nav-link-mobile" onClick={toggleMenu}>Reports</Link>
          <Link to="/backup" className="nav-link-mobile" onClick={toggleMenu}>Backup & Restore</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
