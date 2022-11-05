import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserInfoContext } from "../../UserInfoContext";

export default function Navbar(props) {
  let { loginUser, logout } = useContext(UserInfoContext); 
 
  return (
    <div className="mb-2">

      <nav className="navbar navbar-expand-lg navbar-light minBgColor">
        <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/#">
            Noxi
          </NavLink>
          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon bg-light"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ">
              {loginUser ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link " to="/home">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/search">
                      Search
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-1 mb-lg-0">
              {loginUser ? (
                <>
                   <li  className="nav-item nav-link  ">
                    <p>welcome {loginUser.first_name}</p>
                  </li>
                  <li onClick={logout} className="nav-item nav-link pointer ">
                    Logout
                  </li>
               
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
