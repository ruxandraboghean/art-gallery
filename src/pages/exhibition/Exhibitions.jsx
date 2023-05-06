import React from "react";
import { HomeNavbar } from "../../components/home/HomeNavbar";
import { HomeSidebar } from "../../components/home/HomeSidebar";
import { Exhibition } from "../../components/gallery/exhibition/Exhibition";

export const Exhibitions = () => {
  return (
    <div className="home">
      <HomeSidebar />
      <div className="content">
        <HomeNavbar />
        <div className="works-container">
          <div className="works-title">Exhibitions</div>
          <div className="works-wrapper">
            <a href="google.com" />
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
