import React from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { MenuAlt3Icon } from "@heroicons/react/outline";
import { getKey, removeKey } from "../../helpers/sessionKey";

import Avatar from "../reusable/Avatar";
const Navbar = () => {
  const [click, setClick] = React.useState(false);

  const navigate = useNavigate();
  const handleLogOut = () => {
    removeKey("userData");
    navigate("/login");
  };

  const handleClick = (event) => {
    setClick(!click);
  };

  const Close = () => setClick(false);
  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            Poker Planning
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink to="/newSession" className="nav-links">
                <i className="fa fa-plus-square" aria-hidden="true"></i>
                <span style={{ marginLeft: "1.5rem" }}>Create Session</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <Avatar
                letter={JSON.parse(getKey("userData"))?.name?.charAt(0)}
              />
              <span className="nav-links" onClick={click ? handleClick : null}>
                {JSON.parse(getKey("userData")).name}
              </span>
            </li>
            <li
              className="nav-item"
              onClick={() => handleLogOut()}
              style={{ cursor: "pointer" }}
            >
              <i className="fa fa-sign-out" aria-hidden="true"></i>
              <span to="/about" className="nav-links">
                Logout
              </span>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <MenuAlt3Icon height={24} width={24} style={{ color: "#7f56da" }} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
