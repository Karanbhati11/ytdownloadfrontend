import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = ({ props }) => {
  return (
    <nav className="navbar sticky-top navbar-light bg-dark customnav">
      <a onClick={(e) => e.preventDefault()} className="navbar-brand" href="/">
        <h3 style={{ marginLeft: "20px" }}>{props}</h3>
      </a>

      <div className="nav-btn">
        <div className="mybtn">
          <Link style={{ textDecoration: "none" }} to="/">
            <button className="btn btn-dark">Home</button>
          </Link>
        </div>
        <div className="mybtn">
          <Link to="/AudioPlayer">
            <button className="btn btn-dark">Audio Player</button>
          </Link>
        </div>
        <Outlet />
      </div>
    </nav>
  );
};

export default Navbar;
