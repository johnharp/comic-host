import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import {AuthContext} from '../../context/auth-context';

import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>Chapters</NavLink>
      </li>
      {auth.isLoggedIn && <li>
        <NavLink to="/chapter/new">Add Chapter</NavLink>
      </li>}
      {!auth.isLoggedIn && <li>
        <NavLink to="/auth">Login</NavLink>
      </li>}
    </ul>
  );
};

export default NavLinks;
