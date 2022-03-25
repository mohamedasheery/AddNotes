import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserInfoContext } from "../../UserInfoContext";

export default function Navbar(props) {
  let { loginUser, logout } = useContext(UserInfoContext);

  return (
    <div className="mb-5">
     
      <nav className="navbar navbar-expand-lg fixed-top p-2  bg-dark">
        <div className="container">
           <NavLink className="navbar-brand" to="/">
            Notes
          </NavLink> 
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {loginUser ? (
                <>
                  <li className="nav-item">
                  <NavLink className="nav-link" to="/home">
                    Home
                  </NavLink>
                </li><li className="nav-item">
                    <NavLink className="nav-link" to="/search">
                    Search
                    </NavLink>
                  </li></>
              ) : (
                ""
              )}
            </ul>

            <ul className="navbar-nav ml-auto ">
              {loginUser ? (
                <>
                  <li onClick={logout} className="nav-item nav-link ">
                    Logout
                  </li>
                
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/rigester">
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
