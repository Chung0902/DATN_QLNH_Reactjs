import React from "react";
import { NavLink } from "react-router-dom";

const HeaderEm = () => {
  return (
    <div>
      <div className="slidebar-brand">
        <h3>
          <span className="lab la-accusoft icon-logo" />{" "}
          <b className="logo">HỆ THỐNG QUẢN LÝ</b>{" "}
        </h3>
      </div>
      <div className="slidebar-menu">
        <ul>
          <li>
            <NavLink to="/main/employeedashboard" className="active1">
              <span className="las la-igloo icon-logo" />
              <span>Trang chủ</span>
            </NavLink>
          </li>
          <li className="menu">
            <b>Tài khoản</b>
          </li>
          <li>
            <NavLink to="/main/profilemanager" className="active1">
              <span className="fa-solid fa-address-book" />
              <span>Profile</span>
            </NavLink>
          </li>
          <li className="menu">
            <b>QUẢN LÝ</b>
          </li>
          <li>
            <NavLink to="/main/customermanagement" className="active1">
              <span className="fa-solid fa-users" />
              <span>Khách hàng</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/tablesmanager" className="active1">
              <span className="fas fa-table" />
              <span>Bàn ăn</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/ordermanagement" className="active1">
              <span className="fa-solid fa-truck-field-un" />
              <span>Đơn hàng</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderEm;
