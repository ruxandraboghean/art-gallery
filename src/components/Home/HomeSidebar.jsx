import React, { useState } from "react";
import logo from "../../images/logo_purple_light.png";
import { Link } from "react-router-dom";
import gallery from "../../images/gallery.png";
import menu from "../../images/menu.png";
import onlineCourse from "../../images/online-course.png";
import messages from "../../images/messages.png";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import GallerySubmenu from "./GallerySubmenu";
import { useOnHoverOutside } from "../../hooks/useOnHoverOutside";
import { useRef } from "react";

export const HomeSidebar = () => {
  const dropdownRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMenuDropdownOpen, setMenuDropdownOpen] = useState(false);

  const handleClick = () => {
    setShowSidebar(!showSidebar);
  };

  const closeHoverMenu = () => {
    setMenuDropdownOpen(false);
  };

  useOnHoverOutside(dropdownRef, closeHoverMenu);

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
        {showSidebar ? (
          <IoIcons.IoMdCloseCircle
            className="close-icon"
            onClick={handleClick}
          />
        ) : (
          <img
            src={menu}
            alt="Menu"
            onClick={handleClick}
            className="menu-icon"
          />
        )}
      </div>
      {showSidebar ? (
        <div className="sidebar-menu">
          <Link to="/gallery" className="link">
            <div
              className="sidebar-menu-item"
              ref={dropdownRef}
              onMouseOver={() => setMenuDropdownOpen(true)}
            >
              <img src={gallery} alt="Gallery" className="sidebar-img" />
              <span>Gallery</span>
              {isMenuDropdownOpen && (
                <GallerySubmenu showSidebar={showSidebar} />
              )}
            </div>
          </Link>
          <Link to="/messages" className="link">
            <div className="sidebar-menu-item">
              <img src={messages} alt="messages" className="sidebar-img" />
              <span>Messages</span>
            </div>
          </Link>
          <Link to="/courses" className="link">
            <div className="sidebar-menu-item">
              <img
                src={onlineCourse}
                alt="onlineCourse"
                className="sidebar-img"
              />
              <span>Courses</span>
            </div>
          </Link>
        </div>
      ) : (
        <div className="sidebar-menu">
          <Link to="/gallery" className="link">
            <div
              className="sidebar-menu-item hidden-sidebar-item"
              ref={dropdownRef}
              onMouseOver={() => setMenuDropdownOpen(true)}
            >
              <img src={gallery} alt="Gallery" className="sidebar-img" />
              {isMenuDropdownOpen && (
                <GallerySubmenu showSidebar={showSidebar} />
              )}
            </div>
          </Link>
          <Link to="/messages" className="link">
            <div className="sidebar-menu-item hidden-sidebar-item">
              <img src={messages} alt="messages" className="sidebar-img" />
            </div>
          </Link>
          <Link to="/courses" className="link">
            <div className="sidebar-menu-item hidden-sidebar-item">
              <img
                src={onlineCourse}
                alt="onlineCourse"
                className="sidebar-img"
              />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};
