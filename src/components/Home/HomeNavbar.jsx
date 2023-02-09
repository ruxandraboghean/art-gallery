import React from "react";
import { Link } from "react-router-dom";
import { MenuHeader } from "./MenuHeader";

export const HomeNavbar = () => {
  return (
    <div className="home-navbar">
      <div className="navbar">
        <Link to="/works" className="link">
          <div className="works">Works</div>
        </Link>
        <Link to="/artists" className="link">
          <div className="artists">Artists</div>
        </Link>
      </div>
      <MenuHeader />
    </div>
  );
};
