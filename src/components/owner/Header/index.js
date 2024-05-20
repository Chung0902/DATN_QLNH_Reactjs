import React from "react";
import { NavLink } from "react-router-dom";
import { BsFillChatDotsFill } from "react-icons/bs";

const Header = () => {
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
            <NavLink to="/main/amindashboard" className="active1">
              <span className="las la-igloo icon-logo" />
              <span>Trang chủ</span>
            </NavLink>
          </li>
          <li className="menu">
            <b>QUẢN LÝ</b>
          </li>
          <li>
            <NavLink to="/main/categoriesmanager" className="active1">
              <span className="fa-solid fa-lines-leaning" />
              <span>Danh mục</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/productsmanager" className="active1">
              <span className="fa-solid fa-file-circle-plus" />
              <span>Món ăn</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/tablesmanager" className="active1">
              <span className="fas fa-table" />
              <span>Bàn ăn</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/revenuemanagement" className="active1">
              <span className="fa-solid fa-gears" />
              <span>Thống kê</span>
            </NavLink>
          </li>
          <li className="menu">
            <b>THÔNG TIN</b>
          </li>
          <li>
            <NavLink to="/main/customermanagement" className="active1">
              <span className="fa-solid fa-users" />
              <span>Khách hàng</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/employeemanager" className="active1">
              <span className="fa-solid fa-address-book" />
              <span>Nhân viên</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/main/ordermanagement" className="active1">
              <span className="fa-solid fa-truck-field-un" />
              <span>Đơn hàng</span>
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
