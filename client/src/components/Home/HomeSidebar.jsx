import React from "react";
import logo from "../../images/logo/logo_small.png";
import { Link } from "react-router-dom";
import * as GrIcons from "react-icons/gr";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import { HomeNavbar } from "./HomeNavbar";

export const HomeSidebar = ({ setCurrentMenuItem }) => {
  const handleChangeMenu = (id) => {
    setCurrentMenuItem(id);
  };

  return (
    <div className="home-sidebar hidden-sidebar">
      <div className="sidebar-header">
        <img
          src={logo}
          alt="Logo"
          className="logo"
          onClick={() => handleChangeMenu("exhibitions")}
        />
      </div>
      <div className="sidebar-menu">
        <Link
          to="#"
          className="link"
          onClick={() => handleChangeMenu("exhibitions")}
        >
          <div className="sidebar-menu-item hidden-sidebar-item">
            <GrIcons.GrGallery className="sidebar-img" />
          </div>
        </Link>

        <Link
          to="#"
          className="link"
          onClick={() => handleChangeMenu("artists")}
        >
          <div className="sidebar-menu-item hidden-sidebar-item">
            <FaIcons.FaUserShield className="sidebar-img" />
          </div>
        </Link>
        <Link
          to="#"
          className="link"
          onClick={() => handleChangeMenu("artworks")}
        >
          <div className="sidebar-menu-item hidden-sidebar-item">
            <GrIcons.GrCertificate className="sidebar-img" />
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
      <div className="sidebar-footer">
        <HomeNavbar />
      </div>
    </div>
  );
};
