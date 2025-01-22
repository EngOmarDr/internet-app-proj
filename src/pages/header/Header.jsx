import { Link } from "react-router-dom";
import "./Header.css";
import { FaBell, FaBars } from "react-icons/fa";
import { useState } from "react";
import UserProfileMenu from "../user/UserProfileMenu";
import ToggleTheme from "../../components/ToggleTheme";
import { accessToken } from "../../utils/constant";
import { useTranslation } from "react-i18next";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const token = localStorage.getItem(accessToken);

  return (
    <header className="header">
      <div className="header-logo">
      <h1>{t("sourceSafe")}</h1>
      </div>
      <nav className="header-nav">
        <Link to="/home" className="nav-link">
        {t("home")}
        </Link>
        <Link to="/groups" className="nav-link">
        {t("groups")}
        </Link>
        <Link to="/about" className="nav-link">
        {t("about")}
        </Link>
        {/* <Link to="/reports" className="nav-link">
          Reports
        </Link>
        <Link to="/backup" className="nav-link">
          Backup & Restore
        </Link>
        <Link to="/dashboard" className="nav-link">
          AdminDashboard
        </Link>*/}
        {
          JSON.parse(localStorage.getItem('isAdmin')) == true
          &&
          <Link to="/appDashboard" className="nav-link">
            {t("appDashboard")}
          </Link>
        } 
        {/* <Link to="/users" className="nav-link">
        {t("users")}
        </Link> */}
      </nav>
      {token ? (
        <div className="header-actions">
          <div className="nav-link ">
            <ToggleTheme />
            {/* <LanguageSelector className={`text-slate-900`} /> */}
          </div>
          {/* <Link to="/notifications" className="nav-link">
            <FaBell className="icon notification-icon" title={t("notifications")} />
          </Link> */}
          <UserProfileMenu />
          <FaBars className="menu-toggle" onClick={toggleMenu} />
        </div>
      ) : (
        <div className="header-actions flex space-x-4 items-center">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {t("login")}
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            {t("register")}
          </Link>
        </div>
      )}
      {menuOpen && (
        <div className="mobile-menu show">
          <Link to="/home" className="nav-link-mobile" onClick={toggleMenu}>
          {t("home")}
          </Link>
          <Link to="/groups" className="nav-link-mobile" onClick={toggleMenu}>
          {t("groups")}
          </Link>
          <Link to="/about" className="nav-link-mobile" onClick={toggleMenu}>
          {t("about")}
          </Link>
          {/* <Link to="/reports" className="nav-link-mobile" onClick={toggleMenu}>
            Reports
          </Link>
          <Link to="/backup" className="nav-link-mobile" onClick={toggleMenu}>
            Backup & Restore
          </Link>
          <Link
            to="/dashboard"
            className="nav-link-mobile"
            onClick={toggleMenu}
          >
            AdminDashboard
          </Link> */}
          {   
            JSON.parse(localStorage.getItem('isAdmin')) == true
            && 
            <Link
            to="/appDashboard"
            className="nav-link-mobile"
            onClick={toggleMenu}
          >
            {t("appDashboard")}
          </Link>
          }
        </div>
      )}
    </header>
  );
};

export default Header;
