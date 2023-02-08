import React from "react";
import { MenuHeader } from "./MenuHeader";

export const HomeNavbar = () => {
  return (
    <div className="home-navbar">
      <div className="navbar">
        <div className="works">Works</div>
        <div className="artists">Artists</div>
      </div>
      <MenuHeader />
    </div>
  );
};
