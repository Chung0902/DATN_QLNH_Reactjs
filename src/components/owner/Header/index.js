import React from "react";
import { NavLink } from "react-router-dom";
import { BsFillChatDotsFill } from "react-icons/bs";

const Header = () => {
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
            <NavLink to="/main/amindashboard" className="active1">
              <span className="las la-igloo icon-logo" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="menu">
            <b>Product Management</b>
          </li>
          <li>
            <NavLink to="/main/categoriesmanager" className="active1">
              <span className="fa-solid fa-lines-leaning" />
              <span>Categories</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/productsmanager" className="active1">
              <span className="fa-solid fa-file-circle-plus" />
              <span>Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/tablesmanager" className="active1">
              <span className="fas fa-table" />
              <span>Tables</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/revenuemanagement" className="active1">
              <span className="fa-solid fa-gears" />
              <span>Sales report</span>
            </NavLink>
          </li>
          <li className="menu">
            <b>NOTIFICATION</b>
          </li>
          <li>
            <NavLink to="/main/customermanagement" className="active1">
              <span className="fa-solid fa-users" />
              <span>Customers</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/employeemanager" className="active1">
              <span className="fa-solid fa-address-book" />
              <span>Employees</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/ordermanagement" className="active1">
              <span className="fa-solid fa-truck-field-un" />
              <span>Oders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/chat" className="active1">
              <span><BsFillChatDotsFill/></span>
              <span>Chat</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
