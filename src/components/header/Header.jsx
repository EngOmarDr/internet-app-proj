// Header.js

import { Link } from 'react-router-dom'; // استيراد Link
import './Header.css';
import { FaBell, FaSearch } from 'react-icons/fa';
import UserProfileMenu from '../user/UserProfileMenu';

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <h1>FileManager</h1>
      </div>
      <nav className="header-nav">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/groups" className="nav-link">Groups</Link>
        <Link to="/files" className="nav-link">Files</Link>
        <Link to="/reports" className="nav-link">Reports</Link>
        <Link to="/backup" className="nav-link">Backup & Restore</Link>
      </nav>
      <div className="header-actions">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
        <Link to="/notifications" className="nav-link"> {/* أضف Link هنا */}
          <FaBell className="icon notification-icon" title="Notifications" />
        </Link>
        <UserProfileMenu/>
        {/* <FaUserCircle className="icon profile-icon" title="Profile" /> */}
        
      </div>
    </header>
  );
};

export default Header;
