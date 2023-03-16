import React, { useState } from "react";
import logo from "../../images/logo/logo_purple_light.png";
import { Link } from "react-router-dom";
import modern_art from "../../images/menu/modern-art.png";
import menu from "../../images/menu/menu.png";
import expert from "../../images/menu/expert.png";
import messages from "../../images/menu/messages.png";
import * as IoIcons from "react-icons/io";

export const HomeSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClick = () => {
    setShowSidebar(!showSidebar);
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
          <Link to="/works" className="link">
            <div className="sidebar-menu-item">
              <img src={modern_art} alt="modernArt" className="sidebar-img" />
              <span>Gallery</span>
            </div>
          </Link>
          
          <Link to="/artists" className="link">
            <div className="sidebar-menu-item">
              <img
                src={expert}
                alt="Expert"
                className="sidebar-img"
              />
              <span>Art specialists</span>
            </div>
          </Link>
          <Link to="/messages" className="link">
            <div className="sidebar-menu-item">
              <img src={messages} alt="messages" className="sidebar-img" />
              <span>Messages</span>
            </div>
          </Link>
        </div>
      ) : (
        <div className="sidebar-menu">
          <Link to="/works" className="link">
            <div className="sidebar-menu-item hidden-sidebar-item">
              <img src={modern_art} alt="modernArt" className="sidebar-img" />
            </div>
          </Link>
          
          <Link to="/artists" className="link">
            <div className="sidebar-menu-item hidden-sidebar-item">
              <img
                src={expert}
                alt="expert"
                className="sidebar-img"
              />
            </div>
          </Link>
          <Link to="/messages" className="link">
            <div className="sidebar-menu-item hidden-sidebar-item">
              <img src={messages} alt="messages" className="sidebar-img" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};
