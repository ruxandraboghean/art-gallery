import React, { useState } from "react";
import logo from "../../images/logo/logo_small.png";
import { Link } from "react-router-dom";
import * as GrIcons from "react-icons/gr";
import * as BsIcons from "react-icons/bs";

export const HomeSidebar = ({ setCurrentMenuItem }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClick = () => {
    setShowSidebar(!showSidebar);
  };

  const handleChangeMenu = (id) => {
    setCurrentMenuItem(id);
  };

  return (
    <div className={`home-sidebar ${!showSidebar ? "hidden-sidebar" : ""}`}>
      <div className="sidebar-header">
        {/* {showSidebar && (
          <div className="logo-wrapper center">
            <Link to="#">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </div>
        )} */}
        {/* {showSidebar ? (
          <IoIcons.IoMdCloseCircle
            className="close-icon"
            onClick={handleClick}
          />
        ) : ( */}
        {/* <img
          src={menu}
          alt="Menu"
          // onClick={handleClick}
          className="menu-icon"
        /> */}

        <img
          src={logo}
          alt="Logo"
          className="logo"
          onClick={() => handleChangeMenu("exhibitions")}
        />
        {/* )} */}
      </div>
      {/* {showSidebar ? (
        <div className="sidebar-menu">
          <Link
            to="#"
            className="link"
            onClick={() => handleChangeMenu("exhibitions")}
          >
            <div className="sidebar-menu-item">
              <img src={modern_art} alt="modernArt" className="sidebar-img" />
              <span>Gallery</span>
            </div>
          </Link>

          <Link
            to="#"
            className="link"
            onClick={() => handleChangeMenu("artists")}
          >
            <div className="sidebar-menu-item">
              <img src={expert} alt="Expert" className="sidebar-img" />
              <span>Art specialists</span>
            </div>
          </Link>
          <Link
            to="#"
            className="link"
            onClick={() => handleChangeMenu("messages")}
          >
            <div className="sidebar-menu-item">
              <BsIcons.BsChatSquareHeart />
              <span>Messages</span>
            </div>
          </Link>
        </div>
      ) : ( */}
      <div className="sidebar-menu">
        <Link
          to="#"
          className="link"
          onClick={() => handleChangeMenu("exhibitions")}
        >
          <div className="sidebar-menu-item hidden-sidebar-item">
            <GrIcons.GrGallery className="sidebar-img" />
            {/* <img src={modern_art} alt="modernArt" className="sidebar-img" /> */}
          </div>
        </Link>

        <Link
          to="#"
          className="link"
          onClick={() => handleChangeMenu("artists")}
        >
          <div className="sidebar-menu-item hidden-sidebar-item">
            <GrIcons.GrCertificate className="sidebar-img" />
            {/* <img src={expert} alt="expert" className="sidebar-img" /> */}
          </div>
        </Link>
        <Link
          to="#"
          className="link"
          onClick={() => handleChangeMenu("messages")}
        >
          <div className="sidebar-menu-item hidden-sidebar-item">
            <BsIcons.BsChatSquareHeart className="sidebar-img" />
          </div>
        </Link>
      </div>
      {/* )} */}
    </div>
  );
};
