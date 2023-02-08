import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import logo from "../../images/logo-purple_light.png";
import user from "../../images/user.png";
import gallery from "../../images/gallery.png";
import message from "../../images/message.png";
import courses from "../../images/courses.png";

export const HomeSidebar = () => {
  return (
    <div className="home-sidebar">
      <div className="logo-wrapper center">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="sidebar-menu">
        <div className="sidebar-menu-item">
          <img src={user} alt="User" />
          <span>Profile</span>
        </div>
        <div className="sidebar-menu-item">
          <img src={gallery} alt="User" />
          <span>Gallery</span>
        </div>
        <div className="sidebar-menu-item">
          <img src={message} alt="User" />
          <span>Messages</span>
        </div>
        <div className="sidebar-menu-item">
          <img src={courses} alt="User" />
          <span>Courses</span>
        </div>
      </div>
    </div>
  );
};
