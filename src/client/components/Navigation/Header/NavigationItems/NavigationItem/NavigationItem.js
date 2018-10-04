import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationItem.css";

const navigationItem = props => (
  <li className="NavigationItem">
    <NavLink
      to={props.link}
      exact={props.exact}
      className="NavigationItem-active"
      activeClassName="NavigationItemActive"
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
