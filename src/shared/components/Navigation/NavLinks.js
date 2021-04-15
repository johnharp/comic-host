import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>Chapters</NavLink>
      </li>
      <li>
        <NavLink to="/chapter/new">Add Chapter</NavLink>
      </li>
      <li>
        <NavLink to="/auth">Author Login</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
