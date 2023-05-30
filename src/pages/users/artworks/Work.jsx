import React from "react";
import { HomeNavbar } from "../../../components/home/HomeNavbar";
import { HomeSidebar } from "../../../components/home/HomeSidebar";
import { ArtWork } from "../../../components/ArtWork";

export const Work = () => {
  return (
    <div className="home">
      <HomeSidebar />
      <div className="content">
        <HomeNavbar />
        <div className="works-container">
          <div className="works-title">ArtWork</div>
          <div className="works-wrapper">{/* <ArtWork /> */}</div>
        </div>
      </div>
    </div>
  );
};
