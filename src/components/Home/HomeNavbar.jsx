import React from "react";
import painting from "../../images/painting.png";
import artist from "../../images/artist.png";
import { Link } from "react-router-dom";
import { MenuHeader } from "./MenuHeader";

export const HomeNavbar = () => {
  return (
    <div className="home-navbar">
      <div className="navbar">
        <Link to="/works" className="link">
          <img src={painting} alt="painting" />
          <div className="works">Works</div>
        </Link>
        <Link to="/artists" className="link">
          <img src={artist} alt="artist" />
          <div className="artists">Artists</div>
        </Link>
      </div>
      <MenuHeader />
    </div>
  );
};
