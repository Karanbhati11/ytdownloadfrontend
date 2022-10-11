import axios from "axios";
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  const navigate = useNavigate();
  const Logout = async (e) => {
    // console.log(props.btn_name);
    if (props.btn_name === "Logout") {
      localStorage.clear("jwtoken");
      await axios
        .get("/logout", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          navigate("/login");
        });
    } else if (props.btn_name === "Register") {
      setTimeout(() => {
        navigate("/register");
      }, 1);
    } else if (props.btn_name === "Saved") {
      // console.log("here");
      setTimeout(() => {
        navigate("/Playlist/Homepage");
      }, 1);
    } else if (props.btn_name === "Login") {
      navigate("/login");
    }
  };
  return (
    <nav
      className={`navbar sticky-top navbar-light bg-${props.color} customnav`}
    >
      <a onClick={(e) => e.preventDefault()} className="navbar-brand" href="/">
        <h3 style={{ marginLeft: "20px" }}>{props.name}</h3>
      </a>

      <div className="nav-btn">
        <div className="mybtn">
          <Link style={{ textDecoration: "none" }} to="/">
            <button className={`btn btn-${props.color}`}>Home</button>
          </Link>
        </div>
        <div className="mybtn">
          <Link to="/AudioPlayer">
            <button className={`btn btn-${props.color}`}>Audio Player</button>
          </Link>
        </div>
        <div className="mybtn">
          <Link to="/login">
            <button
              onClick={(e) => Logout(e)}
              className={`btn btn-${props.color}`}
            >
              {props.btn_name}
            </button>
          </Link>
        </div>
        <Outlet />
      </div>
    </nav>
  );
};

export default Navbar;
