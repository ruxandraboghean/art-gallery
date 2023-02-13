import React, { useState } from "react";
import logo from "../../images/logo_purple_light.png";
import user from "../../images/user.png";
import gallery from "../../images/gallery.png";
import message from "../../images/message.png";
import courses from "../../images/courses.png";
import { Link } from "react-router-dom";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const HomeSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const handleClick = () => {
    setShowSidebar(!showSidebar);
    console.log(showSidebar);
  };
  return (
    <div className={`home-sidebar ${!showSidebar ? "hidden-sidebar" : ""}`}>
      <div className="sidebar-header">
        {showSidebar && (
          <div className="logo-wrapper center">
            <Link to="/works">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </div>
        )}
        {!showSidebar ? (
          <FontAwesomeIcon
            icon={faBars}
            onClick={handleClick}
            className="menu-icon"
          />
        ) : (
          <FontAwesomeIcon
            icon={faClose}
            onClick={handleClick}
            className="close-icon"
          />
        )}
      </div>
      {showSidebar && (
        <div className="sidebar-menu">
          <Link to="/profile" className="link">
            <div className="sidebar-menu-item">
              <img src={user} alt="User" />
              <span>Profile</span>
            </div>
          </Link>
          <Link to="/gallery" className="link">
            <div className="sidebar-menu-item">
              <img src={gallery} alt="User" />
              <span>Gallery</span>
            </div>
          </Link>
          <Link to="/messages" className="link">
            <div className="sidebar-menu-item">
              <img src={message} alt="User" />
              <span>Messages</span>
            </div>
          </Link>
          <Link to="/courses" className="link">
            <div className="sidebar-menu-item">
              <img src={courses} alt="User" />
              <span>Courses</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};
