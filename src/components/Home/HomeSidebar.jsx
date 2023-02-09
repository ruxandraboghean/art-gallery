import React from "react";
import logo from "../../images/logo_purple_light.png";
import user from "../../images/user.png";
import gallery from "../../images/gallery.png";
import message from "../../images/message.png";
import courses from "../../images/courses.png";
import { Link } from "react-router-dom";

export const HomeSidebar = () => {
  return (
    <div className="home-sidebar">
      <div className="logo-wrapper center">
        <Link to="/works">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
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
    </div>
  );
};
