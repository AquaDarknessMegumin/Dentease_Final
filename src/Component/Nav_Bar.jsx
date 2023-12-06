import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBell } from '@fortawesome/free-solid-svg-icons';
import ProfilePage from '../Pages/CustomerProfile';
import '../Styles/Nav_Bar.css';

const NavBar = ({notifications}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [activePage, setActivePage] = useState('');
  const location = useLocation();

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!isNotificationsOpen);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <img src="pictures/DentEaseNav.png" alt="Logo" className="logo" />

        <div className="burger-menu" onClick={() => setMenuOpen(!isMenuOpen)}>
          <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
          <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
          <div className={`bar ${isMenuOpen ? 'open' : ''}`} />
        </div>

        <ul className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
          <li className={activePage === '/' ? 'active' : ''}><Link to="/home">Home</Link></li>
          <li className={activePage === '/admin' ? 'active' : ''}><Link to="/admin">Admin</Link></li>
          <li className={activePage === '/doctors' ? 'active' : ''}><Link to="/doctor">Doctor</Link></li>
          <li className={activePage === '/about' ? 'active' : ''}><Link to="/about">About</Link></li>
          <li className={activePage === '/service' ? 'active' : ''}><Link to="/service">Services</Link></li>
          <li className={activePage === '/appointments' ? 'active' : ''}><Link to="/appointments">Make an Appointment</Link></li>
        </ul>






        <div className="dropdown">
          <button
            className="profileicon"
            type="button"
            id="notificationsDropdown"
            onClick={toggleNotifications}
          >
            <FontAwesomeIcon icon={faBell} />
          </button>

          <button
            className="profileicon"
            type="button"
            id="profileDropdown"
            onClick={toggleDropdown}
          >
            <FontAwesomeIcon icon={faUserCircle} />
          </button>

          {isDropdownOpen && (
            <div className="dropdown-menu" aria-labelledby="profileDropdown">
              <Link className="dropdown-item" to="/profile">Profile</Link>
              <div className="dropdown-divider"></div>
              <Link className="dropdown-item" to="/">Logout</Link>
            </div>
          )}

          {isNotificationsOpen && (
            <div className="notifications-dropdown" aria-labelledby="notificationsDropdown">
              {notifications.map((notification, index) => (
                <p key={index}>{notification}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
