import React from "react";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
// We import NavLink to utilize the react router.
import { NavLink, useLocation } from "react-router-dom";
// Here, we display our Navbar
export default function Navbar() {
  const location = useLocation();
  return (
    <div>
      <nav className="navbar  navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <b style={{ width: 25 + "%" }}>Knowledge Management System&nbsp;&nbsp;<span className="bg-success text-white p-2" >(H&K Ltd.)</span></b>
        </NavLink>
        <ul className="pull-right navbar-nav">
          <li>
            {location.pathname === "/users" ? (
              <NavLink className="btn btn-success" to="/register">
                User Registration
              </NavLink>
            ) : (
              <NavLink className="btn btn-success" to="/users">
                User Management
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
