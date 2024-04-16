import React from "react";

import { Outlet, Link } from "react-router-dom";

import "../../styles/header.css";
import Header from "./../owner/Header/index";
import HeaderEm from "../employee/HeaderEm";
import { useAuth } from "../../context/auth";

const Layout = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <>
      <div>
        <input type="checkbox" id="nav-toggle" />
        <div className="slidebar">
          {auth && auth.user && auth.user.role === 1 ? (
            <Header />
          ) : (
            <HeaderEm />
          )}
          {/* <Header /> */}
        </div>
        <div className="main-content">
          <header>
            <h4>
              {/* edit nav-toggle */}
              <label htmlFor="nav-toggle">
                <span className="las la-bars nav" />
              </label>{" "}
              Dashboard
            </h4>
            <div className="user-wrapper">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-info dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.firstName} {auth?.user?.lastName}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/main/profilemanager">
                      Profile
                    </Link>
                  </li>
                  {/* <li><Link className="dropdown-item" to="#">Another action</Link></li> */}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={handleLogout}
                      to="/login"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
