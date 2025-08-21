import React from "react";
import "./Navbar.css"; // We'll create this CSS file
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">User Manager</div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/add"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Add User
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/view"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            View Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
