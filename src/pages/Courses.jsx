import React from "react";
import { HomeNavbar } from "../components/Home/HomeNavbar";
import { HomeSidebar } from "../components/Home/HomeSidebar";

export const Courses = () => {
  return (
    <div className="home">
      <HomeSidebar />
      <div className="navbar">
        <HomeNavbar />
        <div className="courses-container">
          <div className="courses-wrapper">Courses</div>
        </div>
      </div>
    </div>
  );
};
