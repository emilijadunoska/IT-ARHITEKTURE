import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Header = ({isLoggedIn, firstName}) => {
  return (
    <header>
      <h1>Fitness Center Management App</h1>
      <nav className="horizontal-nav">
        <Link to="/">Home</Link>
        <Link to="/user">My Profile</Link>
        <Link to="/membership">Membership</Link>
        <Link to="/groupclass">Group Class</Link>
      </nav>
             {isLoggedIn ? (
          <>
        <div className="user-info">
          <span className="user-icon">
            <FaUser />
          </span>
          <span className="first-name">{firstName}</span>
        </div>
          </>
        ) : (
          <Link to="/user/login" className="user-info">Login</Link>
        )}
    </header>
  );
};

export default Header;
