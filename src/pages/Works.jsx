import { Work } from "../components/Work";
import React from "react";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import { HomeSidebar } from "../components/Home/HomeSidebar";
import { Exhibition } from "../components/Gallery/Exhibition/Exhibition";

export const Works = () => {
  return (
    <div className="home">
      <HomeSidebar />
      <div className="content">
        <HomeNavbar />
        <div className="works-container">
          <div className="works-title">Exibitions</div>
          <div className="works-wrapper">
            <Exhibition />
            <Exhibition />
            <Exhibition />
            <Exhibition />
          </div>
        </div>
      </div>
    </div>
  );
};
