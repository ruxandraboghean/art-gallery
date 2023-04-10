import React from "react";
import { Artist } from "../../components/Artist";
import { HomeNavbar } from "../../components/home/HomeNavbar";
import { HomeSidebar } from "../../components/home/HomeSidebar";

export const Artists = () => {
  return (
    <div className="home">
      <HomeSidebar />
      <div className="content">
        <HomeNavbar />
        <div className="artists-container">
          <div className="artists-wrapper">
            <Artist />
          </div>
        </div>
      </div>
    </div>
  );
};
