import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">

      <div className="logo">
        TOM & JERRY Logistics
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" onClick={handleLinkClick}>Home</NavLink>
        </li>

        <li>
          <NavLink to="/about" onClick={handleLinkClick}>About</NavLink>
        </li>

        <li>
          <NavLink to="/service" onClick={handleLinkClick}>Services</NavLink>
        </li>

        <li>
          <NavLink to="/contact" onClick={handleLinkClick}>Contact</NavLink>
        </li>
      </ul>

      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

    </nav>
  );
};

export default Navbar;
