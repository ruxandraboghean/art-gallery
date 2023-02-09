import React from "react";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import { HomeSidebar } from "../components/Home/HomeSidebar";

export const Gallery = () => {
  return (
    <div className="home">
      <HomeSidebar />
      <div className="navbar">
        <HomeNavbar />
        <div className="gallery-container">
          <div className="gallery-wrapper">Gallery</div>
        </div>
      </div>
    </div>
  );
};
