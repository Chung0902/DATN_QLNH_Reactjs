import React from "react";
import { NavLink } from "react-router-dom";

const HeaderEm = () => {
  return (
    <div>
      <div className="slidebar-brand">
        <h3>
          <span className="lab la-accusoft icon-logo" />{" "}
          <b className="logo">Management System</b>{" "}
        </h3>
      </div>
      <div className="slidebar-menu">
        <ul>
          <li>
            <NavLink to="/main/employeedashboard" className="active1">
              <span className="las la-igloo icon-logo" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="menu">
            <b>Account</b>
          </li>
          <li>
            <NavLink to="/main/profilemanager" className="active1">
              <span className="fa-solid fa-address-book" />
              <span>Profile</span>
            </NavLink>
          </li>
          <li className="menu">
            <b>Manager</b>
          </li>
          <li>
            <NavLink to="/main/customermanagement" className="active1">
              <span className="fa-solid fa-users" />
              <span>Customers</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/ordermanagement" className="active1">
              <span className="fa-solid fa-truck-field-un" />
              <span>Oders</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderEm;
