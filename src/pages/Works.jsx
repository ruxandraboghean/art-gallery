import { Work } from "../components/Work";
import React from "react";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import { HomeSidebar } from "../components/Home/HomeSidebar";

export const Works = () => {
  return (
    <div className="home">
      <HomeSidebar />
      <div className="navbar">
        <HomeNavbar />
        <div className="works-container">
          <div className="works-wrapper">
            <Work />
            <Work />
            <Work />
            <Work />
            <Work />
            <Work />
            <Work />
            <Work />
            <Work />
          </div>
        </div>
      </div>
    </div>
  );
};
