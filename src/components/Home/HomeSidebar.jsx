import React, { useState } from "react";
import logo from "../../images/logo_purple_light.png";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as FcIcons from "react-icons/fc";
import * as TfiIcons from "react-icons/tfi";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";

export const HomeSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

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
          <FaIcons.FaBars onClick={handleClick} className="menu-icon" />
        ) : (
          <AiIcons.AiOutlineCloseCircle
            onClick={handleClick}
            className="close-icon"
          />
        )}
      </div>
      {showSidebar ? (
        <div className="sidebar-menu">
          <Link to="/profile" className="link">
            <div className="sidebar-menu-item">
              <FaIcons.FaUser className="sidebar-img" />
              <span>Profile</span>
            </div>
          </Link>
          <Link to="/gallery" className="link">
            <div className="sidebar-menu-item">
              <TfiIcons.TfiGallery className="sidebar-img" />
              <span>Gallery</span>
            </div>
          </Link>
          <Link to="/messages" className="link">
            <div className="sidebar-menu-item">
              <BsIcons.BsChatDotsFill className="sidebar-img" />
              <span>Messages</span>
            </div>
          </Link>
          <Link to="/courses" className="link">
            <div className="sidebar-menu-item">
              <MdIcons.MdOutlineVideoLibrary className="sidebar-img" />
              <span>Courses</span>
            </div>
          </Link>
        </div>
      ) : (
        <div className="sidebar-menu">
          <Link to="/profile" className="link">
            <div className="sidebar-menu-item hidden-sidebar-item">
              <FaIcons.FaUser className="sidebar-img" />
            </div>
          </Link>
          <Link to="/gallery" className="link">
            <div className="sidebar-menu-item hidden-sidebar-item">
              <TfiIcons.TfiGallery className="sidebar-img" />
            </div>
          </Link>
          <Link to="/messages" className="link">
            <div className="sidebar-menu-item hidden-sidebar-item">
              <BsIcons.BsChatDotsFill className="sidebar-img" />
            </div>
          </Link>
          <Link to="/courses" className="link">
            <div className="sidebar-menu-item hidden-sidebar-item">
              <MdIcons.MdOutlineVideoLibrary className="sidebar-img" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};
