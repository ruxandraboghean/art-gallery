import React from "react";
import { AddCategoryBtn } from "../components/Gallery/AddCategoryBtn";
import { Exhibition } from "../components/Gallery/Exhibition/Exhibition";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import { HomeSidebar } from "../components/Home/HomeSidebar";

export const Gallery = () => {
  return (
    <div className="home">
      <HomeSidebar />
      <div className="content">
        <HomeNavbar />
        <div className="gallery-container">
          <div className="gallery-wrapper">
            <Exhibition />
            <AddCategoryBtn />
          </div>
        </div>
      </div>
    </div>
  );
};
