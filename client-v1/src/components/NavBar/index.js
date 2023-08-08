import React from "react";
import { Link } from "react-router-dom";

const navStyle = {
  backgroundColor: "#333",
  padding: "10px",
};

const navListStyle = {
  listStyle: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0",
  padding: "0",
};

const navItemStyle = {
  margin: "0 10px",
};

const navLinkStyle = {
  textDecoration: "none",
  color: "white",
  fontWeight: "bold",
};

const NavBar = () => {
  return (
    <nav style={navStyle}>
      <ul style={navListStyle}>
        <li style={navItemStyle}>
          <Link style={navLinkStyle} to="/">
            Home
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link style={navLinkStyle} to="/totp">
            TOTP
          </Link>
        </li>
        <li style={navItemStyle}>
          <Link style={navLinkStyle} to="/ocra">
            OCRA
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
